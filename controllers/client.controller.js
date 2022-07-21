const clientModel = require("../model/client.model.js");

async function createClient(req, res, next) {
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
    res.send({ mensagem: "Cadastrado com sucesso!", id: client.insertId });
  } catch (err) {
    next(err);
  }
}

async function getClients(req, res, next) {
  try {
    let clients = await clientModel.getClients();
    res.render('../views/index', {
      clients: clients
    })
  } catch (err) {
    next(err);
  }
}

async function getClient(req, res, next) {
  try {
    let client = await clientModel.getClient(req.params.id);
    if (client.length == 0) {
      res.send({ mensagem: "Nenhum cliente encontrado" });
    } else {
      res.send(client);
    }
  } catch (err) {
    next(err);
  }
}

async function deleteClient(req, res, next) {
  try {
    let client = await clientModel.deleteClient(req.params.id);
    if(client.errno == 1451) throw new Error("Não pode apagar um cliente com serviços no nome dele. Por favor, apague primeiro os serviços. ");
    if(client.affectedRows == 0) throw new Error("Atenção: Você não pode apagar um cliente que não existe. ");
    res.send({ mensagem: "Cliente apagado com sucesso! "});
  } catch (err) {
    next(err);
  }
}

async function updateClient(req, res, next) {
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
    if(client.affectedRows == 0) {
      throw new Error("Ops, parece que você está tentando atualizar um cliente que não existe. ");
    }
    res.send({ mensagem: "Cliente atualizado com sucesso!"});
  } catch (err) {
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
