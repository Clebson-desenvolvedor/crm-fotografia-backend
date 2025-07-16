import IUsuario from "./IUsuario";

export default interface IRepositorioUsuario {
    inserir(usuario: IUsuario): Promise<void>;
    buscarPorEmail(email: string): Promise<IUsuario | null>;
}