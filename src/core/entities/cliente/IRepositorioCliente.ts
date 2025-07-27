import ICliente from "./ICliente";

export type retornoCamposvalidar = {
    cpf?: string;
    email?: string;
    whatsapp: string;
}

export default interface IRepositorioCliente {
    inserir(cliente: ICliente): Promise<void>;
    buscarCamposDuplicados(cliente: ICliente): Promise<retornoCamposvalidar | null>;
    listar(): Promise<ICliente[] | null>;
}