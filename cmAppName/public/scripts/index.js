// ============================== APP AUHTORIZATION ============================== //
/**
 * Get App authorization
 */
function getAppToken() {
    return $.ajax({
        url: "/application-token",
        method: "GET",
    });
}

/**
 * Authorize application
 * @param {*} client_id 
 */
function authorize(client_id) {
    return $.ajax({
        url: "http://localhost:3000/api/v0/oauth/authorize",
        headers: {
            'Content-type': 'application/json'
        },
        method: "GET",
        data: {
            client_id: client_id
        },
    });
}

/**
 * Validate authorize
 * @param {*} authorization_code 
 */
function authorize_code(authorization_code, client_id, client_secret) {
    return $.ajax({
        url: "http://localhost:3000/api/v0/oauth/token",
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        method: "POST",
        data: {
            authorization_code: authorization_code,
            client_id: client_id,
            client_secret: client_secret
        },
    });
}
// ============================== / APP AUHTORIZATION ============================== //

// ============================== APP CALLS ============================== //
/**
 * Login ajax
 * @param {*} user 
 * @param {*} pwd 
 */
function login(user, pwd) {
    return api_ajax("http://localhost:3000/api/v0/oauth/login", "POST", {
        user: user,
        pwd: pwd
    }).done(data => {
        createCookie('user_access_token', data.value.access_token, 1);
    });
}
/**
 * Register ajax
 * @param {*} registerObj
 */
function register(registerObj) {
    return api_ajax("http://localhost:3000/api/v0/default/register", "POST", registerObj).done(data => {
        console.log(data);
    });
}
/**
 * Recover pass ajax
 * @param {*} userOrEmail
 */
function recoverPass(userOrEmail) {
    return api_ajax("http://localhost:3000/api/v0/default/recover-pass", "POST", {
        userOrEmail: userOrEmail
    }).done(data => {
        console.log(data);
    });
}
// ============================== / APP CALLS ============================== //

// ============================== START APP ============================== //

// app getToken
getAppToken()
    .done(app => {
        /**
         * Boostrap application
         */
        function boostrap() {
            // check if Bearer is saved
            if (!readCookie('authorization_access_token')) {
                // call authorize
                authorize(app.client_id).done((data) => {
                    // authorize token
                    authorize_code(
                        data.value.authorization_code,
                        app.client_id,
                        app.client_secret
                    ).done((data) => {
                        // save token in cookie
                        createCookie('authorization_access_token', data.value.access_token, 1);
                        console.log('token saved: ' + data.value.access_token);
                    }).fail((err) => {
                        console.log(err);
                    });

                }).fail((err) => {
                    console.log(err);
                });
            }
        }

        /**
         * Login Utils
         */
        function verifyLogin() {
            let lin = $('#loggin-form');
            let lout = $('#logout-submit');

            if (readCookie('user_access_token')) {
                lin.css('display', 'none');
                lout.css('display', 'block');
            } else {
                lin.css('display', 'block');
                lout.css('display', 'none');
            }
        }
        /**
         * Login action
         */
        function loginEvent() {
            $('#loggin-form').submit((e) => {
                e.preventDefault();
                let user = $(e.target).find('#loggin-form-user').val();
                let pwd = MD5($(e.target).find('#loggin-form-pwd').val());
                login(user, pwd).done((data) => {
                    console.log("Logged: " + readCookie('user_access_token'));
                    verifyLogin();
                });
            });
        }
        /**
         * Login action
         */
        function logoutEvent() {
            $('#logout-submit').on('click', e => {
                eraseCookie('user_access_token');
                verifyLogin();
            });
        }
        /**
         * Register call form and Form Submit
         */
        function callRegisterFormEvent() {
            let form = $('#register-form');
            $('#register-form-call').on('click', e => {
                if (form.data('hidden')) {
                    form.css('display', 'block');
                    form.data('hidden', false);
                } else {
                    form.css('display', 'none');
                    form.data('hidden', true);
                }
            });
        }

        function registerEvent() {
            $('#register-form').submit((e) => {
                e.preventDefault();
                let _register = {
                    nome: $(e.target).find('#register-form-nome').val(),
                    sobrenome: $(e.target).find('#register-form-sobrenome').val(),
                    email: $(e.target).find('#register-form-email').val(),
                    cpf: $(e.target).find('#register-form-cpf').val(),
                    senha: MD5($(e.target).find('#register-form-senha').val()),
                    senhaConf: MD5($(e.target).find('#register-form-confSenha').val())
                };

                register(_register).done(data => data);
            });
        }

        /**
         * Recover pass call form and Form Submit
         */
        function callRecoverPassFormEvent() {
            let form = $('#recover-pass-form');
            $('#recover-pass-form-call').on('click', e => {
                e.preventDefault();
                if (form.data('hidden')) {
                    form.css('display', 'block');
                    form.data('hidden', false);
                } else {
                    form.css('display', 'none');
                    form.data('hidden', true);
                }
            });
        }

        function recoverPassEvent() {
            $('#recover-pass-form').submit(e => {
                e.preventDefault();
                let userOrEmail = $(e.target).find('#recover-pass-form-userEmail').val();
                recoverPass(userOrEmail).done(data => data);
            });
        }

        /**
         * START APPLICATION
         */
        boostrap();
        // --- // --- //
        verifyLogin();
        loginEvent();
        logoutEvent();
        // register form and action
        callRegisterFormEvent();
        registerEvent();
        // recover pass form and action
        callRecoverPassFormEvent();
        recoverPassEvent();
    })
    .fail(err => {
        // no app token provider
    });