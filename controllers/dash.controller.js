const clientModel = require("../model/client.model.js");
const serviceModel = require("../model/service.model");

async function getData(req, res, next) {
    try {
      clients = await clientModel.getClients();
      services = await serviceModel.getServices();
      res.render('../views/inc/dashboard',{
        clients: clients,
        services: services
      })
    } catch (err) {
      next(err);
    }
  }

module.exports = {
    getData
};