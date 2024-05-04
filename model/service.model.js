const mysql = require("./mysql").pool;


/**
 * @desc insere um serviço na base de dados e devolve uma resposta de erro ou sucesso
 * @param {object} service 
 * @returns {object}
 */
function insertService(service) {
    // console.log("Model insertService service", service);
    return new Promise((resolve, reject) => {
        try {
            let sql = "INSERT INTO tb_servicos SET"
            let ct = 0;

            for (field in service) {
                if (field == "preco_total" || field == "preco_entrada" || field == "enderecos") continue;
                if (ct == 0) {
                    sql += ` ${field} = '${service[field]}'`
                } else {
                    sql += `, ${field} = '${service[field]}'`
                }
                ct++;
            }

            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result) => {
                    // console.log("Model insertService result", result);
                    if (err) {
                        console.log("Model insertService conn.query err", err);
                        reject(err);
                        return;
                    }

                    if (service.enderecos?.length > 0) {
                        const addresses = service.enderecos;
                        const id_service = result.insertId;
                        let sql_address =   `INSERT INTO tb_endereco (
                                                endereco_id_servico,
                                                endereco_logradouro,
                                                endereco_numero,
                                                endereco_bairro,
                                                endereco_tipo
                                            ) VALUES`;

                        addresses.forEach((address, i) => {
                            if (i == 0) {
                                sql_address += ` (
                                    ${id_service},
                                    '${address.endereco_logradouro}',
                                    '${address.endereco_numero}',
                                    '${address.endereco_bairro}',
                                    '${address.endereco_tipo}'
                                )`;
                            } else {
                                sql_address += `, (
                                    ${id_service},
                                    '${address.endereco_logradouro}',
                                    '${address.endereco_numero}',
                                    '${address.endereco_bairro}',
                                    '${address.endereco_tipo}'
                                )`;
                            }
                        });

                        conn.query(sql_address, (err, result_address) => {
                            if (err) {
                                console.log("service.model insertService conn.query err", err);
                                reject(err);
                                return;
                            }
                            // resolve(result_address);
                        });
                    }

                    resolve({status: 200, message: "Serviço cadastrado com sucesso!"});
                });
            });
        } catch (err) {
            console.log("Model insertService catch err", err);
        }
    });
}

/**
 * @desc pega os serviços da base 
 * @returns {object}
 */
function getServices(id_client = null) {
    // console.log("service.model getServices");
    return new Promise((resolve, reject) => {
        try {
            let sql = `SELECT * FROM tb_servicos`;
            if (id_client) {
                sql += ` WHERE tb_servicos_id_cliente = ${id_client}`;
            }
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result) => {
                    // console.log("service.model getServices result", result);
                    if (err) {
                        console.log("service.model getServices conn.query err", err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                    conn.release();
                });
            });
        } catch (err) {
            console.log("Model getServices catch err", err);
        }
    });
}

/**
 * @desc pega um serviço da base através do id passado
 * @param {number} id 
 * @returns {object}
 */
function getService(id) {
    // console.log("service.model getService id", id);
    return new Promise((resolve, reject) => {
        try {
            let sql = `SELECT * FROM servicos WHERE idservico = ${id}`;
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result) => {
                    // console.log("service.model getService result", result);
                    console.log("service.model getService conn.query err", err);
                    conn.release();
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            console.log("client.model getService catch err", err);
        }
    });
}

/**
 * @desc deleta um serviço da base através do id passado
 * @param {number} id 
 * @returns {object}
 */
function deleteService(id) {
    // console.log("service.model deleteService id", id);
    return new Promise((resolve, reject) => {
        try {
            let sql = `DELETE FROM servicos WHERE idservico = ${id}`;
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result) => {
                    // console.log("service.model deleteService result", result);
                    console.log("service.model deleteService conn.query err", err);
                    conn.release();
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            console.log("client.model deleteService catch err", err);
        }
    });
}

/**
 * @desc atualiza um serviço da base passando o próprio serviço como parâmetro
 * @param {object} service 
 * @returns {object}
 */
function updateService(service) {
    // console.log("service.model updateService service", service);
    return new Promise((resolve, reject) => {
        try {
            let sql = `
                UPDATE servicos SET 
                tiposervico = "${service.tiposervico}", 
                ambienteservico = "${service.ambienteservico}", 
                dtcadservico = "${service.dtcadservico}", 
                dtevento = "${service.dtevento}", 
                preco = ${service.preco}, 
                statusservico = "${service.statusservico}", 
                enderecoevento = "${service.enderecoevento}", 
                numeroendevento = "${service.numero}", 
                bairroevento = "${service.bairro}",  
                cidadeevento = "${service.cidade}", 
                nomebebe = "${service.nomebebe}", 
                dtnascbebe = "${service.dtnascbebe}", 
                nomecrianca = "${service.nomecrianca}", 
                dtnasccrianca = "${service.dtnasccrianca}", 
                idcliente = ${service.idcliente} 
                WHERE idservico = ${service.idservico}`;

            // console.log("service.model updateService sql", sql);
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log("service.model updateService result", result);
                    console.log("service.model updateService conn.query err", err);
                    conn.release();
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
        } catch (err) {
            console.log("client.model updateService catch err", err);
        }
    });
}

module.exports = {
    insertService,
    getServices,
    getService,
    deleteService,
    updateService,
};
