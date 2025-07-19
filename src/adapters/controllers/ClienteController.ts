import { Express, Request, Response } from "express";
import RegistrarCliente from "../../core/entities/cliente/usecases/RegistrarCliente";

export default class ClienteController {
    constructor(app: Express, private registrarCliente: RegistrarCliente) {
        app.post("/api/clientes", this.registrar.bind(this));
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
}