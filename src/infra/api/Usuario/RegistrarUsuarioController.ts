import { Express, Request, Response } from "express";
import RegistrarUsuario from "../../../core/usuario/usecases/RegistrarUsuario";

export default class RegistrarUsuarioController {
    constructor(app: Express, casoDeUso: RegistrarUsuario) {
        app.post("/api/usuarios/registrar", async (req: Request, res: Response) => {
            try {
                const { nome, email, senha } = req.body;
                await casoDeUso.executar({ nome, email, senha });

                res.status(201).json({ title: "created", status: 201, detail: "Usuário criado com sucesso!" });
            } catch (error: any) {
                res.status(401).json({ title: "Unauthorized", status: 401, detail: error.message });
            }
        });
    }
}