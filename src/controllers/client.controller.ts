import { Request, Response, NextFunction } from "express";
// import { updateClient } from "../model/client.model"
const fs = require('fs').promises;

/**
 * @desc Cria um cliente, ou atualiza-o se existir um id como parâmetro no corpo da requisição
 * @param {object} req
 * @return {Number}
 */

async function createOrUpdateClient(req: Request, res: Response, next: NextFunction) {
    // console.log("client.controler createOrUpdateClient req.body", req.body);
    try {
        let client = req.body;

        if (client.nome_cliente == "" || client.whatsapp_cliente == "" || client.origem_cliente == "") {
            res.send({ message: "Existe campos obrigatórios que não foram preenchidos. ", status: 500 });
        }

        if (client.dtcad_cliente == "" || client.dtcad_cliente == undefined) {
            
        } else {
            
        }

        if (client.id_cliente) {
            const id_client = client.id_cliente;

            // client = await updateClient(client);
            res.send({ message: "Cliente atualizado com sucesso!", status: 200, id: id_client });
        } else {
            // client = await insertClient(client);
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
async function getClients(req: Request, res: Response, next: NextFunction) {
    console.log("controllers: client.controller: getClients");
    try {
        // let clients = await getClients();

        // if (clients.length == 0) {
        //     return res.status(404).send({ data: null, status: 404, message: "Nenhum cliente encontrado. " });
        // }

        // return res.status(200).json({ data: clients, status: 200, message: "Busca de clientes bem sucedida! " });
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
async function getClient(req: Request, res: Response, next: NextFunction) {
    try {
        // let client = await clientModel.getClient(req.params.id);
        res.send("get client/id construção");
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
async function deleteClient(req: Request, res: Response, next: NextFunction) {
    try {
        // let client = await clientModel.deleteClient(req.params.id);
        // console.log("client.controller createClient client", client);
        // if (client.errno == 1451) {
        //     res.send({
        //         message: "Não pode apagar um cliente com serviços em seu nome. Por favor, apague primeiro os serviços. ",
        //         typeMessage: "error", 
        //         title: "Clientes",
        //     });
        // } else {
        //     res.send({ message: "Cliente apagado com sucesso! ", status: 200 });
        // }  
    } catch (err) {
        console.log("client.controller deleteClient catch err", err);
        next(err);
    }
}

async function uploadPhotoClient(req: Request, res: Response, next: NextFunction) {
    // console.log("Controler createOrUpdateClient req.file", req.file);
    // console.log("Controler createOrUpdateClient req.params", req.params);
    try {
        let photo = { name: "/img/no-photo.jpg", id: req.params.id };
        // if (req.file) {
        //     photo.name = `/img/uploads/${req.file.filename}`;
        // }

        // photo = await clientModel.insertPhotoClient(photo);

        res.send({ status: 200 });
    } catch (error) {
        console.log("Controller uploadPhotoClient error: ", error);
    }
}

export default {
    createOrUpdateClient,
    getClients,
    getClient,
    deleteClient,
    uploadPhotoClient
};