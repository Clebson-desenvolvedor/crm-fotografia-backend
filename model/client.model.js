const mysql = require("./mysql.js").pool;

/**
 * @desc Insere um cliente na base e devolve para controller
 * @param {object} client 
 * @returns {Array}
 */
function insertClient(client) {
    // console.log('client.model insertClient client', client);
    return new Promise((resolve, reject) => {
        try {
            let sql = `
            INSERT INTO tb_clientes (
                nome_cliente, 
                whatsapp_cliente, 
                email_cliente, 
                cpf_cliente, 
                dtcad_cliente, 
                foto_cliente
            ) VALUES (?,?,?,?,?,?)`;

            let values = [
                client.nome_cliente,
                client.whatsapp_cliente,
                client.email_cliente,
                client.cpf_cliente,
                client.dtcad_cliente,
                client.foto_cliente
            ];
            // console.log('client.model insertClient values', values);
            mysql.getConnection((err, conn) => {
                conn.query(sql, values, (err, result) => {
                    // console.log('client.model insertClient result', result);
                    if (err) {
                        console.log('client.model insertClient conn.query err', err);
                        reject(err);
                        return;
                    }
                    sql = `
                    INSERT INTO tb_endereco_cliente (
                        ec_logradouro, 
                        ec_numero, 
                        ec_bairro, 
                        ec_cep, 
                        tb_endereco_cliente_id_cliente
                    ) VALUES (?,?,?,?,?)`;

                    let values2 = [
                        client.ec_logradouro,
                        client.ec_numero,
                        client.ec_bairro,
                        client.ec_cep,
                        result.insertId
                    ]
                    // console.log('client.model insertClient values2', values2)
                    conn.query(sql, values2, (err, result) => {
                        if (err) {
                            console.log('client.model insertClient conn.query 2 err', err);
                            reject(err);
                            return;
                        }
                        resolve(result);
                        conn.release();
                    })
                });
            });
        } catch (err) {
            console.log('client.model insertClient catch err', err);
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
                whatsapp_cliente,
                foto_cliente,
                COUNT(tb_servicos_id_cliente) as quantidade_servicos
                FROM tb_clientes
                LEFT JOIN tb_servicos
                ON id_cliente = tb_servicos_id_cliente
                GROUP BY id_cliente
            `;
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log('client.model getClients result', result);
                    if (err) {
                        console.log('client.model getClients conn.query err', err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            console.log('client.model getClients catch err', err);
            throw err;
        }
    });
}

/**
 * @desc Pega um cliente da base pelo id
 * @param {number} id 
 * @returns {object}
 */
function getClient(id) {
    // console.log('client.model getClient');
    // console.log('client.model getClient id', id);
    return new Promise((resolve, reject) => {
        try {
            let sql = `
            SELECT id_cliente,
            nome_cliente, 
            DATE_FORMAT(dtcad_cliente, '%d/%m/%y') as dtcad_cliente, 
            email_cliente,
            whatsapp_cliente,
            cpf_cliente,
            foto_cliente,
            ec_logradouro,
            ec_numero,
            ec_bairro,
            ec_cep,
            tb_endereco_cliente_id_cliente
            FROM tb_clientes
            INNER JOIN tb_endereco_cliente
            ON id_cliente = tb_endereco_cliente_id_cliente
            WHERE id_cliente = ${id}`;

            let objClient = {};
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    //   console.log('client.model getClient result', result);
                    if (err) {
                        console.log('client.model getClient conn.query err', err);
                        reject(err);
                    } else if (result.length == 0) {
                        result = [];
                        resolve(result);
                    } else {
                        objClient = {
                            idcliente: result[0].id_cliente,
                            nomecliente: result[0].nome_cliente,
                            dtcadcliente: result[0].dtcad_cliente,
                            email: result[0].email_cliente,
                            whatsapp: result[0].whatsapp_cliente,
                            logradouro: result[0].ec_logradouro,
                            cpf: result[0].cpf_cliente,
                            numero: result[0].ec_numero,
                            bairro: result[0].ec_bairro,
                            cep: result[0].ec_cep,
                            foto: result[0].foto_cliente
                        };
                        // console.log('client.model getClient objClient', objClient);
                        resolve(objClient);
                        
                        //em breve aqui implementar a query que busca os serviços por cliente
                        
                        
                    }
                });
            });
        } catch (err) {
            console.log('client.model getClient catch err', err);
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
    // console.log('client.model deleteClient id', id);
    return new Promise((resolve, reject) => {
        try {
            let sql = `DELETE FROM tb_endereco_cliente WHERE tb_endereco_cliente_id_cliente = ${id}`;
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log('client.model deleteClient result', result);
                    if (err) {
                        console.log('client.model deleteClient conn.query err.sqlMessage: ', err.sqlMessage);
                        console.log('client.model deleteClient conn.query err.errno:', err.errno);
                        return resolve(err)
                    }

                    mysql.getConnection((err2, conn) => {
                        sql = `DELETE FROM tb_clientes WHERE id_cliente = ${id}`;
                        conn.query(sql, (err2, result2, field) => {
                            // console.log('client.model deleteClient result2', result2);
                            if (err2) {
                                console.log('client.model deleteClient conn.query err2.sqlMessage: ', err2.sqlMessage);
                                console.log('client.model deleteClient conn.query err2.errno:', err2.errno);
                                return resolve(err)
                            }
                            resolve(result2);
                            conn.release();
                        });
                    });
                    resolve(result);
                    conn.release();
                });
            });
        } catch (err) {
            console.log('client.model deleteClient catch err', err);
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
    // console.log('client.model updateClient');
    // console.log('client.model updateClient client', client);
    return new Promise((resolve, reject) => {
        try {
            let sql = `
            UPDATE tb_clientes SET 
            nome_cliente = '${client.nome_cliente}', 
            dtcad_cliente = '${client.dtcad_cliente}', 
            email_cliente = '${client.email_cliente}', 
            whatsapp_cliente = '${client.whatsapp_cliente}',
            cpf_cliente = '${client.cpf_cliente}',
            foto_cliente = '${client.foto_cliente}'
            WHERE id_cliente = ${client.id_cliente}`;
            // console.log('client.model updateClient sql', sql);
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log('client.model updateClient result', result);
                    if (err) {
                        console.log('client.model updateClient conn.query err', err);
                        reject(err);
                        return;
                    }
                    sql = `
                    UPDATE tb_endereco_cliente SET
                    ec_logradouro = '${client.ec_logradouro}',
                    ec_numero = '${client.ec_numero}',
                    ec_bairro = '${client.ec_bairro}',
                    ec_cep = '${client.ec_cep}'
                    WHERE tb_endereco_cliente_id_cliente = ${client.id_cliente}`;

                    mysql.getConnection((err, conn) => {
                        conn.query(sql, (err2, result2, field) => {
                            if (err2) {
                                console.log('client.model updateClient conn.query err2', err2);
                                reject(err);
                                return;
                            }
                            resolve(result2);
                        });
                    })
                    conn.release();
                });
            });
        } catch (err) {
            console.log('client.model updateClient catch err', err);
        }
    });
}

module.exports = {
    insertClient,
    getClients,
    getClient,
    deleteClient,
    updateClient,
};
