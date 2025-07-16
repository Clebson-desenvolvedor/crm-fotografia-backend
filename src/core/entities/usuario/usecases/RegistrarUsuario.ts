import ICasoDeUso from "../../../../shared/ICasoDeUso";
import IRepositorioUsuario from "../IRepositorioUsuario";
import IUsuario from "../IUsuario";
import IProvedorCriptografia from "../../../cripto/IProvedorCriptografia";

type DadosRegistrarUsuario = {
    nome: string;
    email: string;
    senha: string;
};

export default class RegistrarUsuario implements ICasoDeUso<DadosRegistrarUsuario, void> {
    constructor(private repositorio: IRepositorioUsuario, private provedorCripto: IProvedorCriptografia) {};

    async executar(dados: DadosRegistrarUsuario): Promise<void> {
        const senhaCripto = this.provedorCripto.criptografar(dados.senha);
        const usuario: IUsuario = { nome: dados.nome, email: dados.email, senha: senhaCripto };

        await this.repositorio.inserir(usuario);
    }
}