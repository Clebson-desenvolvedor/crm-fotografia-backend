import Usuario from "../entitie/Servico";

export default interface RepositorioUsuario {
    inserir(usuario: Usuario): Promise<void>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
}