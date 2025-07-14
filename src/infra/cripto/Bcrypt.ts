import bcrypt from "bcrypt";
import IProvedorCriptografia from "../../core/cripto/IProvedorCriptografia";

export default class Bcrypt implements IProvedorCriptografia {
    criptografar(texto: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(texto, salt);
    }

    comparar(senha: string, senhaCriptografada: string): boolean {
        return bcrypt.compareSync(senha, senhaCriptografada);
    }
}