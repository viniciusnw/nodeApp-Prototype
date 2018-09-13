// ====== DATABASE ====== //
process.env.DATABASE = JSON.stringify({
    mySql: {
        host: "db-dev.server.cmtecnologia.com.br",
        user: "root",
        password: "+cmdev01",
        database: "cmtecnologia"
    },
    postgreSql: {
        connectionString: "postgres://username:password@localhost/database"
    }
})
module.exports.DATABASE = JSON.parse(process.env.DATABASE);