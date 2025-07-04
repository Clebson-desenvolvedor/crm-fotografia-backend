import ICasoDeUso from "../../../shared/ICasoDeUso";
import IUsuario from "../entitie/Usuario";
import provedorCriptografia from "../../cripo/IProvedorCriptografia";
import IRepositorioUsuario from "../repository/RepositorioUsuario";

type DadosRegistrarUsuario = {
    nome: string;
    email: string;
    senha: string;
};

export default class RegistrarUsuario implements ICasoDeUso<DadosRegistrarUsuario, void> {
    constructor(private repositorio: IRepositorioUsuario, private provedorCripto: provedorCriptografia) {};

    async executar(dados: DadosRegistrarUsuario): Promise<void> {
        const senhaCripto = this.provedorCripto.criptografar(dados.senha);
        const usuario: IUsuario = { nome: dados.nome, email: dados.email, senha: senhaCripto };

        await this.repositorio.inserir(usuario);
    }
}