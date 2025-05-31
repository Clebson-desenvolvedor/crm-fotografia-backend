import Erros from "../../../shared/Erros";
import ICasoDeUso from "../../../shared/ICasoDeUso";
import provedorCriptografia from "../../cripo/ProvedorCriptografia";
import RepositorioUsuario from "../repository/RepositorioUsuario";
import Usuario from "../entitie/Usuario";

export type Entrada = {
    email: string;
    senha: string;
}

export default class LoginUsuario implements ICasoDeUso<Entrada, Usuario> {
    constructor(private repositorio: RepositorioUsuario, private cripto: provedorCriptografia) {};

    async executar(entrada: Entrada): Promise<Usuario> {
        const usuarioExistente = await this.repositorio.buscarPorEmail(entrada.email);

        if (!usuarioExistente) throw new Error(Erros.FALHA_AUTENTICACAO);

        const senhaCorreta = this.cripto.comparar(entrada.senha, usuarioExistente.senha!);

        if (!senhaCorreta) throw new Error(Erros.FALHA_AUTENTICACAO);

        return { ...usuarioExistente, senha: undefined } as Usuario;
    }
}