const express = require("express");
const app = express();
const indexRoute = require("./routes/index.route");
const adminRouter = require("./routes/admin");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient();
const RedisStore = require("connect-redis").default;

const store = new RedisStore({ client: redisClient });

const maxAge = 21600000; // valores em milisegundos: 6 horas.
const secret = "segredo";

redisClient.on("error", (err) => {
    console.error("Redis error:", err);
});

redisClient.connect().then(() => {
    console.log("Connect to Redis");
});

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
// app.use(session({ secret, resave: true, saveUninitialized: true, cookie: { maxAge } }));
app.use(session({ store, secret, resave: false, saveUninitialized: true, cookie: { maxAge } }));
app.use("/admin", adminRouter);

app.use((req, res) => {
    res.redirect("/admin/login");
});

app.use((err, req, res, next) => {
    res.status(400).send({ error: err.message });
});

module.exports = app;
