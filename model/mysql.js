/** Arquivo de configuração com a base de dados */
const mysql = require("mysql");
const pool = mysql.createPool({
    "user": "root",
    "password": "",
    "database": "fotografia-crm",
    "host": "localhost",
    "port": "3306"
});

exports.pool = pool;