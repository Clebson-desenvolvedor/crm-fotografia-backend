/** Arquivo de configuração com a base de dados */
const mysql = require("mysql");

const password = process.env.PASSWORD || "";
const host = process.env.HOST || "localhost";

const pool = mysql.createPool({
    "user": "root",
    "password": password,
    "database": "fotografia-crm",
    "host": host,
    "port": "3306"
});

console.log("Banco de dados rodando... ");

exports.pool = pool;