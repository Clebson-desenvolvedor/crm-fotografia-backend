import { createPool } from "mysql2/promise";
import "dotenv/config";

const password = process.env.PASSWORD;
const host = process.env.HOST;
const user = process.env.USER;


const pool = createPool({
    connectionLimit: 20,
    database: "fotografia-crm",
    host: host,
    password,
    port: 3306,
    queueLimit: 0,
    user,
    waitForConnections: true
});

export default pool;

