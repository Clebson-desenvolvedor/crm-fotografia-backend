import ICasoDeUso from "../../../shared/ICasoDeUso";
import Usuario from "../entitie/Usuario";
import provedorCriptografia from "./ProvedorCriptografia";
import RepositorioUsuario from "../repository/RepositorioUsuario";

export default class RegistrarUsuario implements ICasoDeUso<Usuario, void> {
    constructor(private repositorio: RepositorioUsuario, private provedorCripto: provedorCriptografia) {};

    async executar(usuario: Usuario): Promise<void> {
        const senhaCripto = this.provedorCripto.criptografar(usuario.senha);
    }
}