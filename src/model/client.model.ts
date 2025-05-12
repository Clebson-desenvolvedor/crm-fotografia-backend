// const pool = require("./mysql.js");
import pool from "../infra/db/mysql";

/**
 * @desc Insere um cliente na base e devolve para controller
 * @param {object} client 
 * @returns {Array}
 */
interface Client {
    id_cliente: number;
    nome_cliente: string;
    whatsapp_cliente: string;
    email_cliente: string;
    cpf_cliente: string;
    dtcad_cliente: string;
    endereco_logradouro_cliente: string;
    endereco_numero_cliente: string;
    endereco_bairro_cliente: string;
    origem_cliente: string;
}

async function insertClient(client: Client) {
    // console.log("client.model insertClient client", client);
    let sql = `
        INSERT INTO tb_clientes SET
        nome_cliente = '${client.nome_cliente}',
        whatsapp_cliente = '${client.whatsapp_cliente}',
        email_cliente = '${client.email_cliente}',
        cpf_cliente = '${client.cpf_cliente}',
        dtcad_cliente = '${client.dtcad_cliente}',
        endereco_logradouro_cliente = '${client.endereco_logradouro_cliente}',
        endereco_numero_cliente = '${client.endereco_numero_cliente}',
        endereco_bairro_cliente = '${client.endereco_bairro_cliente}',
        origem_cliente = '${client.origem_cliente}'`;

    let conn;

    try {
        conn = await pool.getConnection();
        const [ result ] = await conn.query(sql);

        return result;
    } catch (err) {
        console.log("Model insertClient catch err", err);
    } finally {
        if (conn) conn.release();
    }
}

/**
 * @desc pega os clientes da base e devolve para controller
 * @returns {Array}
 */
async function getClients() {
    console.log("client.model getClients");
    let sql = `
        SELECT
            id_cliente,
            nome_cliente,
            email_cliente,
            whatsapp_cliente,
            foto_cliente,
            COUNT(servico_id_cliente) as quantidade_servicos
        FROM tb_clientes
        LEFT JOIN tb_servicos ON id_cliente = servico_id_cliente
        GROUP BY id_cliente`;

    let conn;

    try {
        conn = await pool.getConnection();
        const [ results ] = await conn.query(sql);

        return results;
    } catch (err) {
        console.log("client.model getClients err", err);
        throw err;
    } finally {
        if (conn) conn.release();
    }
}

/**
 * @desc Pega um cliente da base pelo id
 * @param {number} id 
 * @returns {object}
 */
async function getClient(id: number): Promise<any> {
    // console.log("client.model getClient");
    let sql = `
        SELECT id_cliente,
            nome_cliente,
            whatsapp_cliente,
            email_cliente,
            cpf_cliente,
            DATE_FORMAT(dtcad_cliente, "%d/%m/%y") AS dtcad_cliente,
            origem_cliente,
            endereco_logradouro_cliente,
            endereco_numero_cliente,
            endereco_bairro_cliente,
            foto_cliente
        FROM tb_clientes
        WHERE id_cliente = ${id}`;

    let conn;

    try {
        conn = await pool.getConnection();
        const [ result ]: any = await conn.query(sql);

        let objClient = {
            id_cliente: result[0].id_cliente,
            nome_cliente: result[0].nome_cliente,
            whatsapp_cliente: result[0].whatsapp_cliente,
            email_cliente: result[0].email_cliente,
            cpf_cliente: result[0].cpf_cliente,
            dtcad_cliente: result[0].dtcad_cliente,
            origem_cliente: result[0].origem_cliente,
            endereco_logradouro_cliente: result[0].endereco_logradouro_cliente,
            endereco_numero_cliente: result[0].endereco_numero_cliente,
            endereco_bairro_cliente: result[0].endereco_bairro_cliente,
            foto_cliente: result[0].foto_cliente
        };
        
        return objClient;
        // Futuramente lógica pra pegar os serviços deste cliente.
    } catch (err) {
        console.log("client.model getClient catch err", err);
    } finally {
        if (conn) conn.release();
    }
}

/**
 * @desc deleta um cliente da base através do id passado como parâmetro e retorna uma resposta de erro 
 * ou sucesso
 * @param {number} id 
 * @returns {Array}
 */
async function deleteClient(id: number): Promise<any> {
    // console.log("client.model deleteClient id", id);
    let sql = `DELETE FROM tb_clientes WHERE id_cliente = ${id}`;
    let conn;

    try {
        conn = await pool.getConnection();
        const [ results ] = await conn.query(sql);
            
        return results;
    } catch (err) {
        console.log("client.model deleteClient catch err", err);
    } finally {
        if (conn) conn.release();
    }
}

/**
 * @desc atualiza um cliente na base passando o próprio cliente como parâmetro e devolve uma 
 * mensagem de erro ou sucesso
 * @param {object} client 
 * @returns {object}
 */

async function updateClient(client: Client): Promise<any> {
    // console.log("client.model updateClient");
    let sql = `
        UPDATE tb_clientes SET
            nome_cliente = "${client.nome_cliente}",
            whatsapp_cliente = "${client.whatsapp_cliente}",
            email_cliente = "${client.email_cliente}",
            cpf_cliente = "${client.cpf_cliente}",
            dtcad_cliente = "${client.dtcad_cliente}",
            origem_cliente = "${client.origem_cliente}",
            endereco_logradouro_cliente = "${client.endereco_logradouro_cliente}",
            endereco_numero_cliente = "${client.endereco_numero_cliente}",
            endereco_bairro_cliente = "${client.endereco_bairro_cliente}"
        WHERE id_cliente = ${client.id_cliente}`;

    let conn;

    try {
        conn = await pool.getConnection();
        const [ results ] = await conn.query(sql);

        return results;
    } catch (err) {
        console.log("Model updateClient catch err", err);
    } finally {
        if (conn) conn.release();
    }
}

async function insertPhotoClient(photo: any): Promise<any> {
    // console.log("Model insertPhotoClient photo: ", photo);
    let sql = `UPDATE tb_clientes SET foto_cliente = "${photo.name}" WHERE id_cliente = ${photo.id}`;
    let conn;

    try {
        conn = await pool.getConnection();
        const [ result ] = await conn.query(sql);

        return result;
    } catch (err) {
        console.log("Model insertPhotoClient conn.query err", err);
    } finally {
        if (conn) conn.release();
    }
}

module.exports = {
    insertClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
    insertPhotoClient
};
