function api_ajax(url, mth, dt, userAuth = false) {
    let authorization_access_token = readCookie('authorization_access_token');
    let headers = {};

    // AUTH HEADERS
    if (userAuth) {
        let user_access_token = readCookie('user_access_token');
        headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': authorization_access_token,
            'Authorization-user': user_access_token
        };
    } else {
        headers = {
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': authorization_access_token,
        };
    }

    return $.ajax({
        url: url,
        headers,
        method: mth,
        data: dt,
    }).fail(err => {
        // commum erro request
        if (err.responseJSON.hasError) {
            switch (err.responseJSON.messages) {
                // jwt expired
                case "bearer:token:expired":
                    console.log('erase authorization_access_token: ' + readCookie('authorization_access_token'));
                    eraseCookie('authorization_access_token'); // erase current and refresh page for another request
                    break;
                case "no:basic-token:provided":
                    console.log('index/login redirect');
                    break;
            }
        }
        return;
    });
}