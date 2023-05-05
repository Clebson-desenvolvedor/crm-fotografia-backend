const JWT = require("jsonwebtoken");
const { promisify } = require("util");

module.exports = {
    e_admin: async function(req, res, next) {
        const AUTH_HEADER = req.headers.authorization;
        if (!AUTH_HEADER) {
            return res.status(401).send({mensagem: "Você precisa estar logado. 1"});
        }

        const TOKEN = AUTH_HEADER.split(" ")[1];

        if (!TOKEN) {
            return res.status(401).send({mensagem: "Você precisa estar logado. 2"});
        }

        try {
            const DECODE = await promisify(JWT.verify)(TOKEN, "segredo");
            req.userId = DECODE.idusuario;
            return next();
        } catch (error) {
            return res.status(401).send({mensagem: "Você precisa estar logado. 3"});
        }
    }
}