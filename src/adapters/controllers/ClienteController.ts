import { Express, Request, Response } from "express";
import ListarClientes from "../../core/entities/cliente/usecases/ListarClientes";
import RegistrarCliente from "../../core/entities/cliente/usecases/RegistrarCliente";

export default class ClienteController {
    constructor(app: Express, private registrarCliente: RegistrarCliente, private listarClientes: ListarClientes) {
        app.post("/api/clientes", this.registrar.bind(this));
        app.get("/api/clientes", this.listar.bind(this));
    }

    async registrar(req: Request, res: Response) {
        try {
            const { cpf, dataCadastro, email, foto, nome, origem, whatsapp } = req.body;
            await this.registrarCliente.executar({ cpf, dataCadastro, email, foto, nome, origem, whatsapp });

            res.status(201).json({ status: 201, title: "created", message: "Cliente criado com sucesso!" });
        } catch (error: any) {
            res.status(error.statusCode).json({ status: error.statusCode, title: error.title, message: error.message });
        }
    }

    async listar(req: Request, res: Response) {
        try {
            const listaClientes = await this.listarClientes.executar();

            res.status(200).json({ status: 200, title: "ok", listaClientes });
        } catch (error: any) {
            res.status(error.statusCode).json({ status: error.statusCode, title: error.title, message: error.message });
        }
    }
}