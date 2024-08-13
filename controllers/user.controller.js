const userModel = require("../model/user.model.js");

/**
 * @desc Cria um novo usuário para a plataforma
 * @param {object} req
 * @return {object}
 */
async function createUser(req, res, next) {
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
async function loginUser(req, res, next) {
    console.log("controllers: user: loginUser");
    // console.log("Controller: loginUser: req.body", req.body);
    try {
        let user = req.body;
        if (!user.email || !user.senha) {
            res.send({ mensagem: "Os campos são obrigatórios. "});
        } else {
            user = await userModel.loginUser(user);
            if (user.length == 0) {
                res.status(401).send({mensagem: "Falha na autenticação!"});
            } else if (!user[0].senha_usuario) {
                res.status(401).send({mensagem: "Falha na autenticação!"});
            } else {
                req.session.userId = user.token;
                res.status(200).send({mensagem: "Usuário autenticado com Sucesso!", token: user["token"]});
            }
        }
    } catch (err) {
        console.log("user.controller loginUser catch err", err);
        next(err);
    }
}

/**
 * @desc Renderiza a tela de login
 */
function login(req, res, next) {
    res.render("admin/login", {
        title: "Login | By Emotion"
    });
}

module.exports = {
    createUser,
    loginUser,
    login
};
