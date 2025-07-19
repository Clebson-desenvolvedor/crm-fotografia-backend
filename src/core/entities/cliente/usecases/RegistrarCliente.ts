import AppError from "../../../../shared/Erros";
import type ICasoDeUso from "../../../../shared/ICasoDeUso";
import type ICliente from "../ICliente";
import type IRepositorioCliente from "../IRepositorioCliente";

export default class RegistrarCliente implements ICasoDeUso<ICliente, void> {
    constructor(private repositorio: IRepositorioCliente) {};

    async executar(dados: ICliente): Promise<void> {
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