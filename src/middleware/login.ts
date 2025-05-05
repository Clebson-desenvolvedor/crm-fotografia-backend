import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

module.exports = (req: Request, res: Response, next: NextFunction) => {
    console.log("middleware: login");
    try {
        const token = req.headers.authorization?.split(" ")[1] || ""; 
        const decode = jwt.verify(token, "segredo");
        // req.user = decode;

        next();
    } catch (error) {
        // console.log("middleware: login catch error: ", error.message);
        return res.render("admin/login", { title: "login", status: 401});
    }
}