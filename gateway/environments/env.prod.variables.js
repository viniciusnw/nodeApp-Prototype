// ====== DATABASE ====== //
process.env.DATABASE = JSON.stringify({
    mySql: {
        host: "",
        user: "",
        password: "",
        database: ""
    },
    postgreSql: {
        connectionString: "postgres://username:password@localhost/database"
    }
})
module.exports.DATABASE = JSON.parse(process.env.DATABASE);