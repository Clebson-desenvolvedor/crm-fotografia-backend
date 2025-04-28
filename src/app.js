const express = require("express");
const app = express();
const router = require("./routes/route");
const bodyParser = require("body-parser");
const path = require("path");

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

app.use("/", router);

app.use((req, res) => {
    res.redirect("/admin/login");
});

app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

module.exports = app;
