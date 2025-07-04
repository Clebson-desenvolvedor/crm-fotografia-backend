import Jwt from "jsonwebtoken";
import IProvedorToken from "../../core/auth/IProvedorToken";

export default class ProvedorJWT implements IProvedorToken {
    constructor(private chave: string) {};

    gerar(usuario: string | object): string {
        return Jwt.sign(usuario, this.chave, { expiresIn: "1h" });
    }

    verificar(token: string): string | object {
        return Jwt.verify(token, this.chave);
    }
}