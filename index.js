const Server = require('./gateway/server/server');

(function () {
    Server.config();
    Server.setAppRun('/api/v0');
    Server.run();
}());

// - AWS -

// - for local dev -
// https://www.npmjs.com/package/aws-sam-local
// https://docs.aws.amazon.com/pt_br/lambda/latest/dg/test-sam-cli.html

// - ssl auth for communication aws -
// https://www.npmjs.com/package/client-certificate-auth 
// https://docs.aws.amazon.com/pt_br/apigateway/latest/developerguide/getting-started-client-side-ssl-authentication.html#generate-client-certificate
// https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_nodejs_express.html

// - ngRok -
// ./ngrok http 3000 <- port bind
// https://dashboard.ngrok.com/get-started

// - http request -
// https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html