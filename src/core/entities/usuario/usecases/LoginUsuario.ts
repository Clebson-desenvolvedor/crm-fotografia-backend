import Erros from "../../../../shared/Erros";
import ICasoDeUso from "../../../../shared/ICasoDeUso";
import IRepositorioUsuario from "../IRepositorioUsuario";
import IUsuario from "../IUsuario";
import IProvedorCriptografia from "../../../cripto/IProvedorCriptografia";

export type Entrada = {
    email: string;
    senha: string;
}

export default class LoginUsuario implements ICasoDeUso<Entrada, IUsuario> {
    constructor(private repositorio: IRepositorioUsuario, private cripto: IProvedorCriptografia) {};

    async executar(entrada: Entrada): Promise<IUsuario> {
        const usuarioExistente = await this.repositorio.buscarPorEmail(entrada.email);

        if (!usuarioExistente) throw new Error(Erros.FALHA_AUTENTICACAO);

        const senhaCorreta = this.cripto.comparar(entrada.senha, usuarioExistente.senha!);

        if (!senhaCorreta) throw new Error(Erros.FALHA_AUTENTICACAO);

        return { ...usuarioExistente, senha: undefined } as IUsuario;
    }
}