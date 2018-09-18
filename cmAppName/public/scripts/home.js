function startHome() {
    return api_ajax("http://localhost:3000/api/v0/default/profissional", "GET", {
        usuario_uuid: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWQiOnsidXVpZCI6MSwibm9tZSI6IlJvYiBEb2UiLCJjcGYiOiIwMDAuMDAwLjAwMC0wMSIsImRhdGFfbmFzY2ltZW50byI6IjA3LzAzLzE5OTQiLCJlbWFpbCI6InJvYi5kb2VAZW1haWwuY29tIiwiY2VsdWxhciI6Iis1NSAzMSA5ODQwNi01MzM1IiwidmVyaWZpY2FkbyI6dHJ1ZSwiYXRpdm8iOnRydWUsInVsdGltb19hY2Vzc28iOiJsYXN0IGRheSIsInVzZXIiOiJSb2IiLCJwd2QiOiI2OThkYzE5ZDQ4OWM0ZTRkYjczZTI4YTcxM2VhYjA3YiJ9LCJpYXQiOjE1MzcyMzI0NzJ9.aGRN2r5KSQvv8GYp3PhAx1MXP1m6AM9EBAJ_uHLh1A4"
    }, true);
}

// app getToken
startHome()
    .done(home => {
        $('body').html("Authorized!");
    }).fail(err => {
        $('body').html("Unauthorized!!");
    });