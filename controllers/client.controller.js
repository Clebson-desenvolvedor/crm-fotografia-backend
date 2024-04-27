const clientModel = require("../model/client.model.js");
const helper = require("../lib/helper");
const moment = require("moment");
const serviceModel = require("../model/service.model");
const sharp = require("sharp");
const fs = require('fs').promises;

/**
 * @desc Cria um cliente, ou atualiza-o se existir um id como parâmetro no corpo da requisição
 * @param {object} req
 * @return {Number}
 */

async function createOrUpdateClient(req, res, next) {
    // console.log("client.controler createOrUpdateClient req.body", req.body);
    try {
        let client = req.body;

        if (client.nome_cliente == "" || client.whatsapp_cliente == "") {
            client.message = "Existe campos obrigatórios que não foram preenchidos. ";
            client.status = 500 // trocar futuramente
            res.send(client);
        }

        if (client.dtcad_cliente == "" || client.dtcad_cliente == undefined) {
            client.dtcad_cliente = helper.convertToMySql();
        } else {
            client.dtcad_cliente = helper.convertToMySql(client.dtcad_cliente);
        }

        if (client.id_cliente) {
            client = await clientModel.updateClient(client);
            res.send({ message: "Cliente atualizado com sucesso!", status: 200 });
        } else {
            client = await clientModel.insertClient(client);
            res.send({ message: "Cliente cadastrado com sucesso!", status: 200, id: client.insertId });
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

async function uploadPhotoClient(req, res, next) {
    // console.log("Controler createOrUpdateClient req.file", req.file);
    // console.log("Controler createOrUpdateClient req.params", req.params);
    try {
        let photo = { name: "/img/no-photo.jpg", id: req.params.id };
        if (req.file) {
            photo.name = `/img/uploads/${req.file.filename}`;
        }

        // const temp_image = req.file.path;

        // const resize_image = await sharp(temp_image)
            // .resize({ width: 40 }) // Redimensiona para largura de 40 pixels
            // .jpeg({ quality: 80 }) // Define a qualidade JPEG para 80%
            // .toBuffer(); // Converte a imagem redimensionada para um buffer em memória

        // Salva a imagem redimensionada de volta no mesmo caminho
        // await fs.writeFile(temp_image, resize_image);

        photo = await clientModel.insertPhotoClient(photo);
        res.send({ status: 200 });
    } catch (error) {
        console.log("Controller uploadPhotoClient error: ", error);
    }
}

module.exports = {
    createOrUpdateClient,
    getClients,
    getClient,
    deleteClient,
    getClientsName,
    uploadPhotoClient
};