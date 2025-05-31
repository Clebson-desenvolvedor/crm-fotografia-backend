import ICasoDeUso from "../../../shared/ICasoDeUso";
import Usuario from "../entitie/Usuario";
import provedorCriptografia from "../../cripo/ProvedorCriptografia";
import RepositorioUsuario from "../repository/RepositorioUsuario";

type DadosRegistrarUsuario = {
    nome: string;
    email: string;
    senha: string;
};

export default class RegistrarUsuario implements ICasoDeUso<DadosRegistrarUsuario, void> {
    constructor(private repositorio: RepositorioUsuario, private provedorCripto: provedorCriptografia) {};

    async executar(dados: DadosRegistrarUsuario): Promise<void> {
        const senhaCripto = this.provedorCripto.criptografar(dados.senha);
        const usuario: Usuario = { nome: dados.nome, email: dados.email, senha: senhaCripto };

        await this.repositorio.inserir(usuario);
    }
}