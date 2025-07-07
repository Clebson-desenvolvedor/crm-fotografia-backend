import { Express, Request, Response} from "express";
import LoginUsuario from "../../core/usuario/usecases/LoginUsuario";
import ProvedorJWT from "../../infra/auth/ProvedorJWT";
import RegistrarUsuario from "../../core/usuario/usecases/RegistrarUsuario";

export default class UsuarioController {
    constructor(app: Express, private loginUsuario: LoginUsuario, private registrarUsuario: RegistrarUsuario) {
        app.post("/api/usuarios/login", this.login.bind(this));
        app.post("/api/usuarios", this.registrar.bind(this));
    }

    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;
            const usuario = await this.loginUsuario.executar({ email , senha });
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
    }

    async registrar(req: Request, res: Response) {
        try {
            const { nome, email, senha } = req.body;
            await this.registrarUsuario.executar({ nome, email, senha });

            res.status(201).json({ title: "created", status: 201, detail: "Usuário criado com sucesso!" });
        } catch (error: any) {
            res.status(401).json({ title: "Unauthorized", status: 401, detail: error.message });
        }
    }
}

