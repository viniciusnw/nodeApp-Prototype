// "express-jwt": "3.3.0",
// "jsonwebtoken": "7.1.9",
// "http": "*",
// "morgan": "*",
// "helmet": "*",
// "cookie-parser": "*",
// "rxjs": "*",
// "node-uuid": "*"

var dependencies = {

    /**
     * Para ler dados de uma requisição HTTP , 
     * 
     * EX: recebe dados de um formulário e o armazena como um objeto javascript 
     * acessível: req.body || req.query.variable
     * 
     * https://www.npmjs.com/package/body-parser
     */
    "body-parser": "1.15.0",

    /**
     * Protocolo de política de mesma origem
     * 
     * Usando o CORS, um servidor pode explicitamente
     * permitir algumas solicitações entre origens enquanto 
     * rejeita outras.
     * 
     * https://docs.microsoft.com/pt-br/aspnet/web-api/overview/security/enabling-cross-origin-requests-in-web-api
     * https://www.npmjs.com/package/cors
     */
    "cors": "2.7.1",

    /**
     * Rastreamentode erros em ambiente de desenvolvimento.
     * 
     * https://github.com/expressjs/errorhandler
     */
    "errorhandler": "1.4.3",

    /**
     * Armazenamento de seção.
     * 
     * ref: express-session
     */
    "cluster-store": "2.0.8",
}