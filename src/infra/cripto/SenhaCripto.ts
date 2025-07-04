import bcrypt from "bcrypt";
import IProvedorCriptografia from "../../core/cripo/IProvedorCriptografia";

export default class SenhaCripto implements IProvedorCriptografia {
    criptografar(texto: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(texto, salt);
    }

    comparar(senha: string, senhaCriptografada: string): boolean {
        return bcrypt.compareSync(senha, senhaCriptografada);
    }
}