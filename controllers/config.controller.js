const clientModel = require("../model/client.model.js");
const serviceModel = require("../model/service.model");

async function getConfig(req, res, next) {
    try {
        clients = await clientModel.getClients();
        services = await serviceModel.getServices();
        res.render('../views/inc/configurations', {
            clients: clients,
            services: services
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getConfig
};