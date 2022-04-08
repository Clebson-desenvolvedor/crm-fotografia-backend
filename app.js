const express = require("express");
const app = express();
const clientRoute = require("./routes/client.route.js");
const serviceRoute = require("./routes/service.route.js");
const userRouter = require("./routes/user.route.js");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/clients", clientRoute);
app.use("/services", serviceRoute);
app.use("/users", userRouter);
// app.use("/users", userRouter);

app.use((err, req, res, next) => {
    res.status(400).send({error: err.message});
});

module.exports = app;