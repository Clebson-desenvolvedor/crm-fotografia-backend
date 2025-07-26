import AppError from "../../../../shared/Erros";
import type ICasoDeUso from "../../../../shared/ICasoDeUso";
import type ICliente from "../ICliente";
import type IRepositorioCliente from "../IRepositorioCliente";

export default class RegistrarCliente implements ICasoDeUso<ICliente, void> {
    constructor(private repositorio: IRepositorioCliente) {};

    async executar(dados: ICliente): Promise<void> {
        dados.cpf = dados.cpf?.replace(/[.-]/g, "");
        
        if (dados.cpf?.length != 0 && dados.cpf?.length != 11) {
            throw new AppError(400, "Bad Request", "CPF com tamanho inválido!");
        }

        const origensValidas = ["facebook", "indicacao", "instagram", "maps", "site"];

        if (!origensValidas.includes(dados.origem)) {
            throw new AppError(400, "Bad Request", "Campo origem não pode ser vazio ou diferente das origens permitidas");
        }

        dados.whatsapp = dados.whatsapp.replace(/\D/g, "");

        if (dados.whatsapp.length == 0) throw new AppError(400, "Bad Request", "O campo WhatsApp é obrigatório!");

        if (dados.whatsapp.length != 11) throw new AppError(400, "Bad Request", "Campo WhatsApp incompleto!");

        const camposValidar = await this.repositorio.buscarCamposDuplicados(dados);

        if (dados.cpf == camposValidar?.cpf) throw new AppError(409, "Conflict", "Já existe um cliente com este cpf!");

        if (dados.email == camposValidar?.email) {
            throw new AppError(409, "Conflict", "Já existe um cliente com este e-mail!");
        }

        if (dados.whatsapp == camposValidar?.whatsapp) {
            throw new AppError(409, "Conflict", "Já existe um cliente com este Whatsapp!");
        }

        await this.repositorio.inserir(dados);
    }
}