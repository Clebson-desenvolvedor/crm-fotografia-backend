import express from "express";
import dotenv from "dotenv";
dotenv.config();

import ListarClientes from "./core/entities/cliente/usecases/ListarClientes";
import LoginUsuario from "./core/entities/usuario/usecases/LoginUsuario";
import RegistrarCliente from "./core/entities/cliente/usecases/RegistrarCliente";
import RegistrarUsuario from "./core/entities/usuario/usecases/RegistrarUsuario";

import Bcrypt from "./infra/cripto/Bcrypt";
import RepositorioUsuarioMS from "./infra/db/usuario/RepositorioUsuarioMS";
import UsuarioController from "./adapters/controllers/UsuarioController";
import RepositorioClienteMS from "./infra/db/cliente/RepositorioClienteMS";
import ClienteController from "./adapters/controllers/ClienteController";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => console.log("Servidor rodando na porta " + port));

const provedorCripto = new Bcrypt();
const repositorioUsuario = new RepositorioUsuarioMS();

const loginUsuario = new LoginUsuario(repositorioUsuario, provedorCripto);
const registrarUsuario = new RegistrarUsuario(repositorioUsuario, provedorCripto);

const repositorioCliente = new RepositorioClienteMS();
const listarClientes = new ListarClientes(repositorioCliente);
const registrarCliente = new RegistrarCliente(repositorioCliente);

new ClienteController(app, registrarCliente, listarClientes);
new UsuarioController(app, loginUsuario, registrarUsuario);
