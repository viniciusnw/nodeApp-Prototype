const Server = require('./gateway/server/server');

(function () {
    Server.config();
    Server.setAppRun('/api/v0');
    Server.run();
}());

// - HEROKU ENV -

// https://powerful-mesa-24537.herokuapp.com/ - webApp
// https://git.heroku.com/powerful-mesa-24537.git - git

// https://devcenter.heroku.com/articles/getting-started-with-nodejs - GetStart Upload Routes

// - AWS -

// - for local dev -
// https://www.npmjs.com/package/aws-sam-local
// https://docs.aws.amazon.com/pt_br/lambda/latest/dg/test-sam-cli.html

// - ssl auth for communication aws -
// https://www.npmjs.com/package/client-certificate-auth 
// https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/getting-started-client-side-ssl-authentication.html#generate-client-certificate