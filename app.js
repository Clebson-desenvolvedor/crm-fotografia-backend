const express = require("express");
const app = express();
const indexRoute = require("./routes/index.route");
const adminRouter = require("./routes/admin");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");

const maxAge = 21600000; // valores em milisegundos: 6 horas.
const secret = process.env.SECRET;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));
app.use(session({ secret: process.env.KEY || 'segredo', resave: true, saveUninitialized: true, cookie: { maxAge } }));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use("/", indexRoute);
app.use("/admin", adminRouter);

app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

module.exports = app;
