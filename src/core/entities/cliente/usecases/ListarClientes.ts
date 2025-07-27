import ICasoDeUso from "../../../../shared/ICasoDeUso";
import ICliente from "../ICliente";
import IRepositorioCliente from "../IRepositorioCliente";

export default class ListarClientes implements ICasoDeUso<void, ICliente[] | null> {
    constructor(private repositorio: IRepositorioCliente) {};

    async executar(): Promise<ICliente[] | null> {
        return await this.repositorio.listar();
    }
    
}