import Erros from "../../../shared/Erros";
import ICasoDeUso from "../../../shared/ICasoDeUso";
import provedorCriptografia from "../../cripo/IProvedorCriptografia";
import IRepositorioUsuario from "../repository/RepositorioUsuario";
import IUsuario from "../Usuario";

export type Entrada = {
    email: string;
    senha: string;
}

export default class LoginUsuario implements ICasoDeUso<Entrada, IUsuario> {
    constructor(private repositorio: IRepositorioUsuario, private cripto: provedorCriptografia) {};

    async executar(entrada: Entrada): Promise<IUsuario> {
        const usuarioExistente = await this.repositorio.buscarPorEmail(entrada.email);

        if (!usuarioExistente) throw new Error(Erros.FALHA_AUTENTICACAO);

        const senhaCorreta = this.cripto.comparar(entrada.senha, usuarioExistente.senha!);

        if (!senhaCorreta) throw new Error(Erros.FALHA_AUTENTICACAO);

        return { ...usuarioExistente, senha: undefined } as IUsuario;
    }
}