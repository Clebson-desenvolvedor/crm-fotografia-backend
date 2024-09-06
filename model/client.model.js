const mysql = require("./mysql.js");

/**
 * @desc Insere um cliente na base e devolve para controller
 * @param {object} client 
 * @returns {Array}
 */
async function insertClient(client) {
    // console.log("client.model insertClient client", client);
    return new Promise((resolve, reject) => {
        try {
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
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result_client) => {
                    // console.log("Model insertClient result_client", result_client);
                    if (err) {
                        console.log("Model insertClient conn.query err", err);
                        reject(err);
                        conn.release();
                        return;
                    }
                    resolve({ id_cliente: result_client.insertId });
                    conn.release();
                    return;
                });
            });
        } catch (err) {
            console.log("Model insertClient catch err", err);
        }
    });
}

/**
 * @desc pega os clientes da base e devolve para controller
 * @returns {Array}
 */
function getClients() {
    return new Promise((resolve, reject) => {
        try {
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
                GROUP BY id_cliente
            `;
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log("client.model getClients result", result);
                    if (err) {
                        console.log("Model getClients conn.query error", err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            console.log("client.model getClients catch err", err);
            throw err;
        }
    });
}

function getClientsName() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT id_cliente, nome_cliente FROM tb_clientes`;
        mysql.getConnection((err, conn) => {
            conn.query(sql, (err, result, field) => {
                if (err) {
                    console.log("Model getClientsName conn.query error", err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
}

/**
 * @desc Pega um cliente da base pelo id
 * @param {number} id 
 * @returns {object}
 */
function getClient(id) {
    // console.log("client.model getClient");
    // console.log("client.model getClient id", id);
    return new Promise((resolve, reject) => {
        try {
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

            let objClient = {};
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    //   console.log("client.model getClient result", result);
                    if (err) {
                        console.log("Model getClient conn.query err", err);
                        reject(err);
                    } else if (result.length == 0) {
                        resolve({status: 404, message: "Cliente não encontrado. ", error: true });
                    } else {
                        let client = result[0];

                        objClient = {
                            id_cliente: client.id_cliente,
                            nome_cliente: client.nome_cliente,
                            whatsapp_cliente: client.whatsapp_cliente,
                            email_cliente: client.email_cliente,
                            cpf_cliente: client.cpf_cliente,
                            dtcad_cliente: client.dtcad_cliente,
                            origem_cliente: client.origem_cliente,
                            endereco_logradouro_cliente: client.endereco_logradouro_cliente,
                            endereco_numero_cliente: client.endereco_numero_cliente,
                            endereco_bairro_cliente: client.endereco_bairro_cliente,
                            foto_cliente: client.foto_cliente
                        };
                        // console.log("client.model getClient objClient", objClient);
                        resolve(objClient);
                        
                        //em breve aqui implementar a query que busca os serviços por cliente
                        
                        
                    }
                });
            });
        } catch (err) {
            console.log("client.model getClient catch err", err);
        }
    });
}

/**
 * @desc deleta um cliente da base através do id passado como parâmetro e retorna uma resposta de erro 
 * ou sucesso
 * @param {number} id 
 * @returns {Array}
 */
function deleteClient(id) {
    // console.log("client.model deleteClient id", id);
    return new Promise((resolve, reject) => {
        try {
            mysql.getConnection((err, conn) => {
                sql = `DELETE FROM tb_clientes WHERE id_cliente = ${id}`;
                conn.query(sql, (err, result, field) => {
                    // console.log("client.model deleteClient result", result);
                    if (err) {
                        console.log("client.model deleteClient conn.query err.sqlMessage: ", err.sqlMessage);
                        console.log("client.model deleteClient conn.query err.errno:", err.errno);
                        return resolve(err)
                    }
                    resolve(result);
                    conn.release();
                });
            });
            resolve(result);
            conn.release();
        } catch (err) {
            console.log("client.model deleteClient catch err", err);
        }
    });
}

/**
 * @desc atualiza um cliente na base passando o próprio cliente como parâmetro e devolve uma 
 * mensagem de erro ou sucesso
 * @param {object} client 
 * @returns {object}
 */

function updateClient(client) {
    // console.log("client.model updateClient");
    return new Promise((resolve, reject) => {
        try {
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
            // console.log("Model updateClient sql", sql);
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log("client.model updateClient result", result);
                    if (err) {
                        console.log("Model updateClient conn.query err", err);
                        reject(err);
                        return;
                    }

                    resolve({ id_cliente: client.id_cliente });
                    conn.release();
                });
            });
        } catch (err) {
            console.log("Model updateClient catch err", err);
        }
    });
}

async function insertPhotoClient(photo) {
    // console.log("Model insertPhotoClient photo: ", photo);
    return new Promise((resolve, reject) => {
        let sql = `UPDATE tb_clientes SET foto_cliente = "${photo.name}" WHERE id_cliente = ${photo.id}`;
        mysql.getConnection((err, conn) => {
            conn.query(sql, (err, result) => {
                // console.log("Model insertPhotoClient result", result);
                if (err) {
                    console.log("Model insertPhotoClient conn.query err", err);
                    reject(err);
                    conn.release();
                    return;
                }
                resolve(result);
                conn.release();
            });
        });
    });
}

module.exports = {
    insertClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
    getClientsName,
    insertPhotoClient
};
