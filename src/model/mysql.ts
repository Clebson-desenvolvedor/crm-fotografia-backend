import mysql from "mysql2";

const password = process.env.PASSWORD;
const host = process.env.HOST;
const user = process.env.USER;

const pool = mysql.createPool({
    user,
    password,
    database: "fotografia-crm",
    host: host,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
}).promise();

export default pool;

