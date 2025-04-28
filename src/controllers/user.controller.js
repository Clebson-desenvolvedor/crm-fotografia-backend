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
    try {
        let user = req.body;

        if (!user.email || !user.senha) {
            res.send({ mensagem: "Os campos são obrigatórios. "});
        } else {
            user = await userModel.loginUser(user);

            if (!user) {
                res.status(401).send({ mensagem: "Falha na autenticação!" });
            } else {
                req.session.user = user; // Armazene o usuário na sessão
                res.status(200).send({ mensagem: "Usuário autenticado com Sucesso!", user });
            }
        }
    } catch (err) {
        console.error("user.controller loginUser catch err", err);
        next(err);
    }
}

/**
 * Responsável pelo logout e destruir a sessão
 */
function logout(req, res, next) {
    console.log("controllers: user: logout");
    req.session.destroy((err) => {
        if (err) return res.status(500).send({ message: "Erro ao destruir a sessão. " });
    });

    res.send({ message: "Sessão destruída com sucesso. "});
}


function login(req, res, next) {
    res.send("get login construção");
}

module.exports = {
    // createUser,
    loginUser,
    login,
    logout
};
