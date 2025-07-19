import AppError from "../../../../shared/Erros";
import ICasoDeUso from "../../../../shared/ICasoDeUso";
import IProvedorCriptografia from "../../../cripto/IProvedorCriptografia";
import IRepositorioUsuario from "../IRepositorioUsuario";
import IUsuario from "../IUsuario";

export type Entrada = {
    email: string;
    senha: string;
}

export default class LoginUsuario implements ICasoDeUso<Entrada, IUsuario> {
    constructor(private repositorio: IRepositorioUsuario, private cripto: IProvedorCriptografia) {};

    async executar(entrada: Entrada): Promise<IUsuario> {
        const usuarioExistente = await this.repositorio.buscarPorEmail(entrada.email);

        if (!usuarioExistente) throw new AppError(401, "Unauthorized", "Credenciais inválidas!");

        const senhaCorreta = this.cripto.comparar(entrada.senha, usuarioExistente.senha!);

        if (!senhaCorreta) throw new AppError(401, "Unauthorized", "Credenciais inválidas!");

        return { ...usuarioExistente, senha: undefined } as IUsuario;
    }
}