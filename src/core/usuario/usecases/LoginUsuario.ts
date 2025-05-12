import Erros from "../../../shared/Erros";
import ICasoDeUso from "../../../shared/ICasoDeUso";
import Usuario from "../entitie/Usuario";
import RepositorioUsuario from "../repository/RepositorioUsuario";
import provedorCriptografia from "./ProvedorCriptografia";

export type Entrada = {
    email: string;
    senha: string;
}

export default class LoginUsuario implements ICasoDeUso<Entrada, Usuario> {
    constructor(private repositorio: RepositorioUsuario, private cripto: provedorCriptografia) {};

    async executar(entrada: Entrada): Promise<Usuario> {
        // const usuarioExistente = await this.repositorio.buscarPorEmail(entrada.email);

        // if (!usuarioExistente) throw new Error(Erros.FALHA_AUTENTICACAO);

        // const senhaCorreta = this.cripto.comparar(entrada.senha, usuarioExistente.senha!);

        // if (!senhaCorreta) throw new Error(Erros.FALHA_AUTENTICACAO);

        return { nome: "Clebson", email: "clebson.araujo.25@gmail.com" };
    }
}