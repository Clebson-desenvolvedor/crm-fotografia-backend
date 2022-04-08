const mysql = require("./mysql.js").pool;

function insertClient(client) {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO clientes (nomecliente, dtnasccliente, dtcadcliente, email, whatsapp, enderecocliente, numeroendcliente, bairrocliente, cepcliente, cidadecliente) VALUES (?,?,?,?,?,?,?,?,?,?)";
    const values = [
      client.nomecliente,
      client.dtnasccliente,
      client.dtcadcliente,
      client.email,
      client.whatsapp,
      client.enderecocliente,
      client.numeroendcliente,
      client.bairrocliente,
      client.cepcliente,
      client.cidadecliente,
    ];
    mysql.getConnection((err, conn) => {
      conn.query(sql, values, (err, result, field) => {
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

function getClients() {
  return new Promise((resolve, reject) => {
    try {
      let sql = "SELECT * FROM clientes";
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
    } catch (err) {
      throw err;
    }
  });
}

function getClient(id) {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM clientes WHERE idcliente = ${id}`;
    let objClient = {};
    mysql.getConnection((err, conn) => {
      conn.query(sql, (err, result, field) => {
        if (err) {
          reject(err);
        } else if (result.length == 0) {
          result = [];
          resolve(result);
        } else {
          objClient = {
            idcliente: result[0].idcliente,
            nomecliente: result[0].nomecliente,
            dtnasccliente: result[0].dtnasccliente,
            dtcadcliente: result[0].dtcadcliente,
            email: result[0].email,
            whatsapp: result[0].whatsapp,
            enderecocliente: result[0].enderecocliente,
            numeroendcliente: result[0].numeroendcliente,
            bairrocliente: result[0].bairrocliente,
            cepcliente: result[0].cepcliente,
            cidadecliente: result[0].cidadecliente,
          };

          let sql2 = `SELECT idservico, tiposervico, ambienteservico, dtcadservico, dtevento, preco, statusservico, enderecoevento, numeroendevento, bairroevento, cepevento, cidadeevento, nomebebe, dtnascbebe, nomecrianca FROM servicos INNER JOIN clientes ON servicos.idcliente = clientes.idcliente WHERE clientes.idcliente = ${objClient.idcliente}`;
          conn.query(sql2, (err, result2) => {
            if (err) {
              reject(err);
              return;
            }
            objClient.servicos = result2;
            conn.release();
            resolve(objClient);
          });
        }
      });
    });
  });
}

function deleteClient(id) {
  return new Promise((resolve, reject) => {
    let sql = `DELETE FROM clientes where idcliente = ${id}`;
    mysql.getConnection((err, conn) => {
      conn.query(sql, (err, result, field) => {
        conn.release();
        if(err){
          result = err;
        }  
        resolve(result);
      });
    });
  });
}

function updateClient(client) {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE clientes SET 
    nomecliente = '${client.nomecliente}', 
    dtnasccliente = '${client.dtnasccliente}', 
    dtcadcliente = '${client.dtcadcliente}', 
    email = '${client.email}', 
    whatsapp = '${client.whatsapp}', 
    enderecocliente = '${client.enderecocliente}', 
    numeroendcliente = '${client.numeroendcliente}', 
    bairrocliente = '${client.bairrocliente}', 
    cepcliente = '${client.cepcliente}', 
    cidadecliente = '${client.cidadecliente}' 
    where idcliente = ${client.idcliente}`;
    mysql.getConnection((err, conn) => {
      conn.query(sql, (err, result, field) => {
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

module.exports = {
  insertClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};
