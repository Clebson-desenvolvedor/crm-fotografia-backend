type origem = "facebook" | "indicacao" | "instagram" | "maps" | "site";

export default interface ICliente {
    id?: number;
    cpf?: string;
    dataCadastro: number;
    email?: string;
    foto?: string;
    nome: string;
    origem: origem;
    whatsapp: string;
}