const express = require("express");
const app = express();
const userRouter = require("./routes/user.route.js");
const indexRoute = require("./routes/index.route");
const dashRoute = require("./routes/dash.route");
const adminRouter = require("./routes/admin");
const configRoute = require("./routes/config.route");
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
app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/users", userRouter);
app.use("/", indexRoute);
app.use("/dashboard", dashRoute);
app.use("/configurations", configRoute);
app.use("/admin", adminRouter);

app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

module.exports = app;
