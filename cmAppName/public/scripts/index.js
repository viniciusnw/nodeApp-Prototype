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

// ============================== APP AUHTORIZATION ============================== //

/**
 * Login
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
                let user = $(e.target).find('#user').val();
                let pwd = MD5($(e.target).find('#pwd').val());
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
         * START APPLICATION
         */
        boostrap();
        // --
        verifyLogin();
        loginEvent();
        logoutEvent();
    })
    .fail(err => {
        // no app token provider
    });