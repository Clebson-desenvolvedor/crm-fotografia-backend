import jwt from "jsonwebtoken";
import IProvedorToken from "../../core/auth/IProvedorToken";

export default class JsonWebToken implements IProvedorToken {
    constructor(private chave: string) {};

    gerar(usuario: string | object): string {
        return jwt.sign(usuario, this.chave, { expiresIn: "1h" });
    }

    verificar(token: string): string | object {
        return jwt.verify(token, this.chave);
    }
}