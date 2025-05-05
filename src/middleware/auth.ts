import { NextFunction, Request, Response } from "express";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log("middlwware: authMiddleware");

    // if (req.session && req.session.user) {
    //     next();
    // } else {
    //     console.log("middlwware: authMiddleware userId inexistente", req.session ? req.session : "Sessão não encontrada");
    //     res.redirect("/admin/login");
    // }
}