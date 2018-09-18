function startHome() {
    return api_ajax("http://localhost:3000/api/v0/default/professional/per-usr-id", "GET", null, true);
}

// app getToken
startHome()
    .done(home => {
        $('body').html("Authorized!");
    }).fail(err => {
        $('body').html("Unauthorized!!");
    });