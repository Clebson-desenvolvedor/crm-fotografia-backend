import AppError from "../../../shared/Erros";
import ICliente from "../../../core/entities/cliente/ICliente";
import IRepositorioCliente, { type retornoCamposvalidar } from "../../../core/entities/cliente/IRepositorioCliente";
import pool from "../mysql";

export default class RepositorioClienteMS implements IRepositorioCliente {
    async buscarCamposDuplicados(cliente: ICliente): Promise<retornoCamposvalidar | null> {
        try {
            const [rows]: any = await pool.query(
                "SELECT cpf, email, whatsapp FROM tb_clientes WHERE cpf = ? OR email = ? OR whatsapp = ?",
                [cliente.cpf, cliente.email, cliente.whatsapp]
            );

            if (rows.length === 0) return null;

            const row = rows[0];

            return row;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    async inserir(cliente: ICliente): Promise<void> {
        try {
            await pool.query(
                `INSERT INTO tb_clientes
                (cpf, data_cadastro, email, foto, nome, origem, whatsapp)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    cliente.cpf,
                    cliente.dataCadastro,
                    cliente.email,
                    cliente.foto,
                    cliente.nome,
                    cliente.origem,
                    cliente.whatsapp
                ]
            );
        } catch (error: any) {
            console.log("Erro ao tentar inserir um cliente: ", error)
            throw new AppError(500, "Erro", "Erro inesperado no servidor!")
        }
    }
}