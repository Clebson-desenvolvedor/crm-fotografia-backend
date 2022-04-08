const mysql = require("./mysql").pool;

function insertService(service) {
  return new Promise((resolve, reject) => {
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
    mysql.getConnection((err, conn) => {
      conn.query(sql, values, (err, result) => {
        if(err){
          result = err;
        }  
        resolve(result);
        conn.release();
      });
    });
  });
}

function getServices() {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM servicos`;
    mysql.getConnection((err, conn) => {
      conn.query(sql, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
        conn.release();
      });
    });
  });
}

function getService(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM servicos WHERE idservico = ${id}`;
    mysql.getConnection((err, conn) => {
      conn.query(sql, (err, result) => {
        conn.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  });
}

function deleteService(id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM servicos WHERE idservico = ${id}`;
    mysql.getConnection((err, conn) => {
      conn.query(sql, (err, result) => {
        conn.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  });
}

function updateService(service) {
  return new Promise((resolve, reject) => {
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

    mysql.getConnection((err, conn) => {
      conn.query(sql, (err, result, field) => {
        conn.release();
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  });
}

module.exports = {
  insertService,
  getServices,
  getService,
  deleteService,
  updateService,
};
