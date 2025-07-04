import express from "express";
import LoginUsuario from "./core/usuario/usecases/LoginUsuario";
import RepositorioUsuarioMS from "./infra/db/usuario/RepositorioUsuarioMS";
import SenhaCripto from "./infra/cripto/SenhaCripto";

import dotenv from "dotenv";
import LoginUsuarioController from "./infra/api/Usuario/LoginUsuarioController";
import RegistrarUsuario from "./core/usuario/usecases/RegistrarUsuario";
import RegistrarUsuarioController from "./infra/api/Usuario/RegistrarUsuarioController";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log("Servidor rodando na porta " + port));

const repositorioUsuario = new RepositorioUsuarioMS();
const provedorCripto = new SenhaCripto();

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto);
const registrarUsuario = new RegistrarUsuario(repositorioUsuario, provedorCripto);

new LoginUsuarioController(app, loginUsuario);
new RegistrarUsuarioController(app, registrarUsuario);


