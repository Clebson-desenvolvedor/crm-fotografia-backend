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
      // console.log('client.model insertClient values', values);
      mysql.getConnection((err, conn) => {
        conn.query(sql, values, (err, result, field) => {
          // console.log('client.model insertClient result', result);
          console.log('client.model insertClient conn.query err', err);
          conn.release();
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
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
  // console.log('client.model getClients');
  return new Promise((resolve, reject) => {
    try {
      let sql = "SELECT nome_cliente, email_cliente, whatsapp_cliente, foto_cliente FROM tb_clientes";
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
  // console.log('client.model getClient id', id);
  return new Promise((resolve, reject) => {
    try {
      let sql = `SELECT * FROM clientes WHERE idcliente = ${id}`;
      let objClient = {};
      mysql.getConnection((err, conn) => {
        conn.query(sql, (err, result, field) => {
          // console.log('client.model getClient result', result);
          console.log('client.model getClient conn.query err', err);
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

            // console.log('client.model getClient objClient', objClient);
            let sql2 = `SELECT idservico, tiposervico, ambienteservico, dtcadservico, dtevento, preco, statusservico, enderecoevento, numeroendevento, bairroevento, cepevento, cidadeevento, nomebebe, dtnascbebe, nomecrianca FROM servicos INNER JOIN clientes ON servicos.idcliente = clientes.idcliente WHERE clientes.idcliente = ${objClient.idcliente}`;
            conn.query(sql2, (err, result2) => {
              // console.log('client.model getClient result2', result2);
              console.log('client.model getClient conn.query #2 err', err);
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
      let sql = `DELETE FROM clientes where idcliente = ${id}`;
      mysql.getConnection((err, conn) => {
        conn.query(sql, (err, result, field) => {
          // console.log('client.model deleteClient result', result);
          console.log('client.model deleteClient conn.query err', err);
          conn.release();
          if (err) {
            result = err;
          }
          resolve(result);
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
  // console.log('client.model updateClient client', client);
  return new Promise((resolve, reject) => {
    try {
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
      // console.log('client.model updateClient sql', sql);
      mysql.getConnection((err, conn) => {
        conn.query(sql, (err, result, field) => {
          // console.log('client.model updateClient result', result);
          console.log('client.model updateClient conn.query err', err);
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
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
