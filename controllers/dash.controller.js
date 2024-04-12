const clientModel = require("../model/client.model.js");
const serviceModel = require("../model/service.model");
const leadModel = require("../model/lead.model.js");

async function getData(req, res, next) {
    try {
        // clients = await clientModel.getClients();
        // services = await serviceModel.getServices();
        // leads = await leadModel.getLeads();
        res.render("admin/dashboardPage", {
            // clients: clients,
            // services: services,
            // leads: leads
            title: "Página Dashboard"
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getData
};