const mysql = require("./mysql").pool;


/**
 * @desc insere um serviço na base de dados e devolve uma resposta de erro ou sucesso
 * @param {object} service 
 * @returns {object}
 */
function insertService(service) {
  // console.log('service.model insertService service', service);
  return new Promise((resolve, reject) => {
    try {
      let sql = `INSERT INTO servicos (tiposervico, ambienteservico, dtcadservico, dtevento, preco, statusservico, enderecoevento, numeroendevento, bairroevento, cepevento, cidadeevento, nomebebe, dtnascbebe, nomecrianca, dtnasccrianca, idcliente) 
    values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      let values = [
        service.tiposervico,
        service.ambienteservico,
        service.dtcadservico,
        service.dtevento,
        service.preco,
        service.statusservico,
        service.enderecoevento,
        service.numero,
        service.bairro,
        service.cep,
        service.cidade,
        service.nomebebe,
        service.dtnascbebe,
        service.nomecrianca,
        service.dtnasccrianca,
        service.idcliente,
      ];
      // console.log('service.model insertService values', values);
      mysql.getConnection((err, conn) => {
        conn.query(sql, values, (err, result) => {
          // console.log('service.model insertService result', result);
          console.log('service.model insertService conn.query err', err);
          if (err) {
            result = err;
          }
          resolve(result);
          conn.release();
        });
      });
    } catch (err) {
      console.log('client.model insertService catch err', err);
    }
  });
}

/**
 * @desc pega os serviços da base 
 * @returns {object}
 */
function getServices() {
  // console.log('service.model getServices');
  return new Promise((resolve, reject) => {
    try {
      let sql = `SELECT * FROM servicos`;
      mysql.getConnection((err, conn) => {
        conn.query(sql, (err, result) => {
          // console.log('service.model getServices result', result);
          console.log('service.model getServices conn.query err', err);
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
          conn.release();
        });
      });
    } catch (err) {
      console.log('client.model getServices catch err', err);
    }
  });
}

/**
 * @desc pega um serviço da base através do id passado
 * @param {number} id 
 * @returns {object}
 */
function getService(id) {
  // console.log('service.model getService id', id);
  return new Promise((resolve, reject) => {
    try {
      let sql = `SELECT * FROM servicos WHERE idservico = ${id}`;
      mysql.getConnection((err, conn) => {
        conn.query(sql, (err, result) => {
          // console.log('service.model getService result', result);
          console.log('service.model getService conn.query err', err);
          conn.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    } catch (err) {
      console.log('client.model getService catch err', err);
    }
  });
}

/**
 * @desc deleta um serviço da base através do id passado
 * @param {number} id 
 * @returns {object}
 */
function deleteService(id) {
  // console.log('service.model deleteService id', id);
  return new Promise((resolve, reject) => {
    try {
      let sql = `DELETE FROM servicos WHERE idservico = ${id}`;
      mysql.getConnection((err, conn) => {
        conn.query(sql, (err, result) => {
          // console.log('service.model deleteService result', result);
          console.log('service.model deleteService conn.query err', err);
          conn.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    } catch (err) {
      console.log('client.model deleteService catch err', err);
    }
  });
}

/**
 * @desc atualiza um serviço da base passando o próprio serviço como parâmetro
 * @param {object} service 
 * @returns {object}
 */
function updateService(service) {
  // console.log('service.model updateService service', service);
  return new Promise((resolve, reject) => {
    try {
      let sql = `UPDATE servicos SET 
        tiposervico = '${service.tiposervico}', 
        ambienteservico = '${service.ambienteservico}', 
        dtcadservico = '${service.dtcadservico}', 
        dtevento = '${service.dtevento}', 
        preco = ${service.preco}, 
        statusservico = '${service.statusservico}', 
        enderecoevento = '${service.enderecoevento}', 
        numeroendevento = '${service.numero}', 
        bairroevento = '${service.bairro}', 
        cepevento = '${service.cep}', 
        cidadeevento = '${service.cidade}', 
        nomebebe = '${service.nomebebe}', 
        dtnascbebe = '${service.dtnascbebe}', 
        nomecrianca = '${service.nomecrianca}', 
        dtnasccrianca = '${service.dtnasccrianca}', 
        idcliente = ${service.idcliente} 
        WHERE idservico = ${service.idservico}`;

      // console.log('service.model updateService sql', sql);
      mysql.getConnection((err, conn) => {
        conn.query(sql, (err, result, field) => {
          // console.log('service.model updateService result', result);
          console.log('service.model updateService conn.query err', err);
          conn.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    } catch (err) {
      console.log('client.model updateService catch err', err);
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
