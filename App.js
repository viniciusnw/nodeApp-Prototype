{LEARN}
// https://scotch.io/tutorials/getting-to-know-flux-the-react-js-architecture
// https://www.npmjs.com/package/flux
// https://imasters.com.br/desenvolvimento/gerenciando-o-fluxo-assincrono-de-operacoes-em-nodejs

// https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/create_deploy_nodejs.html
// https://docs.aws.amazon.com/pt_br/elasticbeanstalk/latest/dg/nodejs-getstarted.html
// https://blog.risingstack.com/10-best-practices-for-writing-node-js-rest-apis/
// https://medium.com/codebase/structure-of-a-nodejs-api-project-cdecb46ef3f8

// https://github.com/gothinkster/node-express-realworld-example-app
// https://github.com/elsewhencode/project-guidelines#6-structure-and-naming


{SWAGGER}
// for view api states
// https://swagger.io/tools/swagger-ui/

{API authentication}
- jwt
// http://www.luiztools.com.br/post/autenticacao-json-web-token-jwt-em-nodejs/
// os produtos vão rodar no nosso ambiente?
// app.post('/login', (req, res, next) => {
//     if(req.body.user === 'luiz' && req.body.pwd === '123'){
//       //auth ok
//       const id = 1; //esse id viria do banco de dados
//       var token = jwt.sign({ id }, process.env.SECRET, {
//         expiresIn: 300 // expires in 5min
//       });
//       res.status(200).send({ auth: true, token: token });
//     }
    
//     res.status(500).send('Login inválido!');
//   })
-oauth2
https://www.npmjs.com/package/oauth2-server


{Payload}
// Odata
