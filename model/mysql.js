/** Arquivo de configuração com a base de dados */
const mysql = require("mysql2");

const password = process.env.PASSWORD;
const host = process.env.HOST;
const user = process.env.USER;


const pool = mysql.createPool({
    user: user,
    password: password,
    database: "fotografia-crm",
    host: host,
    port: 3306
});

pool.getConnection((err, conn) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados: ", err);
    } else {
        console.log("Banco de dados conectado com sucesso no host", host);
    }
});

module.exports = pool;