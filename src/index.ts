import express from "express";
import LoginUsuario from "./core/usuario/usecases/LoginUsuario";
import RepositorioUsuarioMS from "./infra/db/RepositorioUsuarioMS";
import SenhaCripto from "./infra/auth/SenhaCripto";

import dotenv from "dotenv";
import LoginUsuarioController from "./infra/api/Usuario/LoginUsuarioController";
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log("Servidor rodando na porta " + port));

const repositorioUsuario = new RepositorioUsuarioMS();
const provedorCripto = new SenhaCripto();

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto);

new LoginUsuarioController(app, loginUsuario);


