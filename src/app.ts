import { Router } from "express";
import bodyParser from "body-parser";
import express, { Request, Response, NextFunction } from "express";
import path from "path";

const app = express();
const router = Router();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/", router);

app.use((req, res) => {
    res.redirect("/login");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).send({ error: err.message });
});

module.exports = app;
