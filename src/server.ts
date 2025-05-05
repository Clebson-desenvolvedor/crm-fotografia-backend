import http from "http";
import * as app from "./app.js";

require("dotenv").config();

const server = http.createServer(app);
const port = 3001;

server.listen(port, () => console.log("API iniciada na porta ", port));