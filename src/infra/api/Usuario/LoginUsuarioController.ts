import { Express, Request, Response} from "express";
import LoginUsuario from "../../../core/usuario/usecases/LoginUsuario";
import ProvedorJWT from "../../auth/ProvedorJWT";

export default class LoginUsuarioController {
    constructor(app: Express, casoDeUso: LoginUsuario) {
        app.post("/api/usuarios/login", async (req: Request, res: Response) => {
            try {
                const { email, senha } = req.body;
                const usuario = await casoDeUso.executar({ email , senha });
                const jwt = new ProvedorJWT(process.env.JWT_CHAVE!);

                res.status(200).json({
                    "mensagem": "Usuário autenticado com sucesso!",
                    "token": jwt.gerar(usuario)
                });
            } catch (erro: any) {
                res.status(401).json({
                    title: "Unauthorized",
                    status: 401,
                    detail: erro.message || "Erro ao realizar login."
                });
            }
        });
    }
}

