const userModel = require("../model/user.model.js");

async function createUser(req, res, next) {
  try {
    let user = req.body;
    console.log(user)
    if (!user.email || !user.senha) throw new Error("Os campos são obrigatórios! ");
    user = await userModel.insertUser(user);
    if (user.errno == 1062) throw new Error("Atenção: Usuário já cadastrado");
    res.send({
      mensagem: "Usuário cadastrado com sucesso!",
      email: req.body.email,
      Id: user.insertId,
    });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    let user = req.body;
    if (!user.email || !user.senha) throw new Error("Os campos são obrigatórios! ");
    user = await userModel.loginUser(user);
    if (!user.password || user.length == 0) throw new Error("Erro: E-mail ou senha inválido.");
    res.send({
      Mensagem: "Usuário autenticado com sucesso! ", 
      Usuario: req.body.email, 
      Token: user.jwt
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createUser,
  loginUser,
};
