const mariadb = require("mariadb");

require("dotenv").config({path:__dirname+'/../.env'});

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectionLimit: 5
})

pool.getConnection().then((connection) => {
    connection.release()
    console.log("db connection is established")
}).catch(err => {
    console.error(err.code)
    console.log(err)
})

module.exports = pool