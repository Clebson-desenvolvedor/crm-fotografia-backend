import Jwt from "jsonwebtoken";
import ProvedorToken from "../../core/auth/ProvedorToken";

export default class ProvedorJWT implements ProvedorToken {
    constructor(private chave: string) {};

    gerar(usuario: string | object): string {
        return Jwt.sign(usuario, this.chave, { expiresIn: "1h" });
    }

    verificar(token: string): string | object {
        return Jwt.verify(token, this.chave);
    }
}