const clientModel = require("../model/client.model.js");
const serviceModel = require("../model/service.model");

/**
 * @desc Cria um cliente e retorna uma resposta de sucesso ou falha ao usuário
 * @param {object} req
 * @return {Number}
 */

async function createClient(req, res, next) {
  // console.log('client.controler createClient req.body', req.body);
  try {
    let client = req.body;
    if (
      !req.body.nomecliente ||
      !req.body.dtnasccliente ||
      !req.body.dtcadcliente
    ) {
      throw new Error("Alguns campos são obrigatórios. ");
    }
    client = await clientModel.insertClient(client);
    // console.log('client.controler createClient client', client);
    res.send({ mensagem: "Cadastrado com sucesso!", id: client.insertId });
  } catch (err) {
    console.log('client.controller createClient catch err', err);
    next(err);
  }
}

/**
 * @desc Pega os clientes e devolve para o usuário
 * @return {Array}
 */
async function getClients(req, res, next) {
  // console.log('client.controller getClients req.body', req.body);
  try {
    clients = await clientModel.getClients();
    // console.log('client.controller getClients clients', clients);
    res.render('../views/inc/clients', {
      title: 'clientes',
      clients: clients
    })
  } catch (err) {
    console.log('client.controller getClients catch err', err);
    next(err);
  }
}

/**
 * @desc Pega um cliente pelo id e devolve para o usuári
 * @param {Number} id
 * @return {Array}
 */
async function getClient(req, res, next) {
  // console.log('client.controller getClient req.params.id', req.params.id);
  try {
    let client = await clientModel.getClient(req.params.id);
    // console.log('client.controller getClient client', client);
    if (client.length == 0) {
      res.send({ mensagem: "Nenhum cliente encontrado" });
    } else {
      res.send(client);
    }
  } catch (err) {
    console.log('client.controller getClient catch err', err);
    next(err);
  }
}

/**
 * @desc Deleta um cliente pelo id passado como parâmetro e retorna uma mensagem de erro ou sucesso
 * @param {Number} req
 * @return {object}
 */
async function deleteClient(req, res, next) {
  // console.log('client.controller deleteClient req.params.id', req.params.id);
  try {
    let client = await clientModel.deleteClient(req.params.id);
    // console.log('client.controller createClient client', client);
    if(client.errno == 1451) throw new Error("Não pode apagar um cliente com serviços no nome dele. Por favor, apague primeiro os serviços. ");
    if(client.affectedRows == 0) throw new Error("Atenção: Você não pode apagar um cliente que não existe. ");
    res.send({ mensagem: "Cliente apagado com sucesso! "});
  } catch (err) {
    console.log('client.controller deleteClient catch err', err);
    next(err);
  }
}

/**
 * @desc Atualiza um cliente e retorna uma mensagem de erro ou sucesso para o usuário
 * @param {object} req 
 * @return {object}
 */
async function updateClient(req, res, next) {
  // console.log('client.controller updateClient req.body', req.body);
  try {
    let client = req.body;
    if (
      !req.body.nomecliente ||
      !req.body.dtnasccliente ||
      !req.body.dtcadcliente
    ) {
      throw new Error("Alguns campos são obrigatórios. ");
    }
    client = await clientModel.updateClient(client);
    // console.log('client.controller updateClient client', client);
    if(client.affectedRows == 0) {
      throw new Error("Ops, parece que você está tentando atualizar um cliente que não existe. ");
    }
    res.send({ mensagem: "Cliente atualizado com sucesso!"});
  } catch (err) {
    console.log('client.controller updateClient catch err', err);
    next(err);
  }
}

module.exports = {
  createClient,
  getClients,
  getClient,
  deleteClient,
  updateClient,
};