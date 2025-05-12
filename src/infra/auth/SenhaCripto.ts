import bcrypt from "bcrypt";
import provedorCriptografia from "../../core/usuario/usecases/ProvedorCriptografia";

export default class SenhaCripto implements provedorCriptografia {
    criptografar(texto: string): string {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(texto, salt);
    }

    comparar(senha: string, senhaCriptografada: string): boolean {
        return bcrypt.compareSync(senha, senhaCriptografada);
    }
}