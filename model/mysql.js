/** Arquivo de configuração com a base de dados */
const mysql = require("mysql");

const password = process.env.PASSWORD;
const host = process.env.HOST;

const pool = mysql.createPool({
    "user": "root",
    "password": "",
    "database": "fotografia-crm",
    "host": "localhost",
    "port": "3306"
});

console.log("Banco de dados rodando... ");

exports.pool = pool;