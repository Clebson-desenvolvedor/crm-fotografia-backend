const serviceModel = require("../model/service.model.js");

async function createService(req, res, next) {
  try {
    let service = req.body;
    if (
      !service.tiposervico ||
      !service.dtcadservico ||
      !service.preco ||
      !service.statusservico ||
      !service.idcliente
    ) {
      throw new Error("Alguns campos são obrigatórios");
    }
    service = await serviceModel.insertService(service);
    if(service.errno == 1452) throw new Error("Atenção: Você está tentando criar um serviço para um cliente que não existe. ");
    res.send({ mensagem: "Serviço criado com sucesso!", id: service.insertId });
  } catch (err) {
    next(err);
  }
}

async function getServices(req, res, next) {
  try {
    let service = await serviceModel.getServices();
    if(service.length == 0) {
      res.send({ mensagem: "Nenhum serviço encontrado. "});
    }
    res.send(await serviceModel.getServices());
  } catch (err) {
    next();
  }
}

async function getService(req, res, next) {
  try {
    let service = await serviceModel.getService(req.params.id);
    if (service.length == 0) {
      res.send({ mensagem: "Nenhum serviço encontrado" });
    } else {
      res.send(service);
    }
  } catch (err) {
    next(err);
  }
}

async function deleteService(req, res, next) {
  try {
    let service = await serviceModel.deleteService(req.params.id);
    if (service.affectedRows == 0) {
      throw new Error(
        "Ops, parece que você está tentando apagar um serviço que não existe."
      );
    }
    res.send({ mensagem: "Serviço apagado com sucesso!" });
  } catch (err) {
    next(err);
  }
}

async function updateService(req, res, next) {
  try {
    let service = req.body;
    if (
      !service.tiposervico ||
      !service.dtcadservico ||
      !service.preco ||
      !service.statusservico ||
      !service.idcliente
    ) {
      throw new Error("Alguns campos são obrigatórios");
    }
    service = await serviceModel.updateService(service);
    if (service.affectedRows == 0) {
      throw new Error("Ops!, parece que este serviço ainda não foi criado. ");
    }
    res.send({
      mensagem: "Serviço atualizado com sucesso",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createService,
  getServices,
  getService,
  deleteService,
  updateService,
};
