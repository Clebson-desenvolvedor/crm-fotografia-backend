import Usuario from "../entitie/Usuario";

export default interface RepositorioUsuario {
    inserir(usuario: Usuario): Promise<void>;
    buscarPorEmail(email: string): Promise<Usuario | null>;
}