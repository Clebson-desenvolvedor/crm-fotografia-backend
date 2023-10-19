const http = require("http");
const port = process.env.PORT || 3001;
console.log(process.env.PORT)
const app = require("./app.js");
const server = http.createServer(app);

server.listen(port, () => console.log("API iniciada na porta ", port));