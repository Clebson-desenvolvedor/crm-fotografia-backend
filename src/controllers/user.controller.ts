import { Request, Response, NextFunction } from "express";

const userModel = require("../model/user.model.js");

/**
 * @desc Cria um novo usuário para a plataforma
 * @param {object} req
 * @return {object}
 */
async function createUser(req: Request, res: Response, next: NextFunction) {
    // console.log("user.controller createUser req.body", req.body);
    try {
        let user = req.body;
        if (!user.email || !user.senha) throw new Error("Os campos são obrigatórios! ");
        user = await userModel.insertUser(user);
        if (user.errno == 1062) throw new Error("Atenção: Usuário já cadastrado");
        res.send({
            mensagem: "Usuário cadastrado com sucesso!",
            email: req.body.email,
            Id: user.insertId,
        });
    } catch (err) {
        console.log("user.controller createUser catch err", err);
        next(err);
    }
}

/**
 * @desc Faz login com o usuário e devolve uma mensagem de erro ou sucesso
 * @param {object} req 
 * @return {object}
 */


/**
 * Responsável pelo logout e destruir a sessão
 */
function logout(req: Request, res: Response, next: NextFunction) {
    // console.log("controllers: user: logout");
    // req.session.destroy((err) => {
    //     if (err) return res.status(500).send({ message: "Erro ao destruir a sessão. " });
    // });

    res.send({ message: "Sessão destruída com sucesso. "});
}


function login(req: Request, res: Response, next: NextFunction) {
    res.send("get login construção");
}

module.exports = {
    // createUser,
    loginUser,
    login,
    logout
};
