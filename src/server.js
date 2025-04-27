require("dotenv").config();

const http = require("http");
const app = require("./app.js");
const server = http.createServer(app);
const port = 3001

server.listen(port, () => console.log("API iniciada na porta ", port));