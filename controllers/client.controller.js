const clientModel = require("../model/client.model.js");
const helper = require("../lib/helper");
const moment = require("moment");
const serviceModel = require("../model/service.model");

/**
 * @desc Cria um cliente, ou atualiza-o se existir um id como parâmetro no corpo da requisição
 * @param {object} req
 * @return {Number}
 */

async function createOrUpdateClient(req, res, next) {
    // console.log("client.controler createOrUpdateClient req.body", req.body);
    // console.log("client.controler createOrUpdateClient req.file", req.file);
    try {
        let client = req.body;

        if (client.nome_cliente == "" || client.whatsapp_cliente == "") {
            client.message = "Existe campos obrigatórios que não foram preenchidos. ";
            client.status = 500 // trocar futuramente
            res.send(client);
        }
        
        if (req.file) {
            client.foto_cliente = req.file.filename;
        } else {
            client.foto_cliente = "no-photo.jpg";
        }

        if (client.dtcad_cliente == "" || client.dtcad_cliente == undefined) {
            client.dtcad_cliente = helper.convertToMySql();
        } else {
            client.dtcad_cliente = helper.convertToMySql(client.dtcad_cliente);
        }

        if (client.id_cliente) {
            client = await clientModel.updateClient(client);
            client.message = "Cliente atualizado com sucesso!";
            res.send(client);
        } else {
            client = await clientModel.insertClient(client);
            client.message = "Cliente cadastrado com sucesso!";
            client.status = 200;
            res.send(client);
        }
    } catch (err) {
        console.log("client.controller createClient catch err", err);
        next(err);
    }
}

/**
 * @desc Pega os clientes e devolve para o usuário
 * @return {Array}
 */
async function getClients(req, res, next) {
    try {
        let clients = await clientModel.getClients();

        res.render("admin/clientsPage", {
            title: "Clientes",
            clients: clients
        });
    } catch (err) {
        console.log("Controller getClients catch error", err);
        next(err);
    }
}

/**
 * @desc Pega um cliente pelo id e devolve para o usuário
 * @param {Number} id
 * @return {Array}
 */
async function getClient(req, res, next) {
    try {
        let client = await clientModel.getClient(req.params.id);
        let servicesClient = await serviceModel.getServices(req.params.id);
        // console.log("client.controller getClient client", client);
        res.render("admin/clientPage", {
            title: client.nome_cliente,
            clientData: client,
            message: "",
            typeMessage: undefined,
            moment: moment,
        })
    } catch (err) {
        console.log("Controller getClient catch error", err);
        next(err);
    }
}

/**
 * @desc Deleta um cliente pelo id passado como parâmetro e retorna uma mensagem de erro ou sucesso
 * @param {Number} req
 * @return {object}
 */
async function deleteClient(req, res, next) {
    try {
        let client = await clientModel.deleteClient(req.params.id);
        // console.log("client.controller createClient client", client);
        if (client.errno == 1451) {
            res.send({
                message: "Não pode apagar um cliente com serviços em seu nome. Por favor, apague primeiro os serviços. ",
                typeMessage: "error", 
                title: "Clientes",
            })
        } else {
            res.send({  
                message: "Cliente apagado com sucesso! ",
                status: "success"
            });
        }  
    } catch (err) {
        console.log("client.controller deleteClient catch err", err);
        next(err);
    }
}

async function getClientsName(req, res, next) {
    try {
        let nomes_clientes = await clientModel.getClientsName();

        res.send(nomes_clientes)
    } catch (err) {
        console.log("Controller getClientsName catch error", err);
        next(err);
    }
}

module.exports = {
    createOrUpdateClient,
    getClients,
    getClient,
    deleteClient,
    getClientsName
};