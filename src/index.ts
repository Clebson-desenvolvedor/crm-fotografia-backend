import express from "express";
import dotenv from "dotenv";
dotenv.config();

import LoginUsuario from "./core/entities/usuario/usecases/LoginUsuario";
import RegistrarUsuario from "./core/entities/usuario/usecases/RegistrarUsuario";

import Bcrypt from "./infra/cripto/Bcrypt";
import RepositorioUsuarioMS from "./infra/db/usuario/RepositorioUsuarioMS";
import UsuarioController from "./adapters/controllers/UsuarioController";


const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log("Servidor rodando na porta " + port));

const repositorioUsuario = new RepositorioUsuarioMS();
const provedorCripto = new Bcrypt();

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto);
const registrarUsuario = new RegistrarUsuario(repositorioUsuario, provedorCripto);

new UsuarioController(app, loginUsuario, registrarUsuario);
