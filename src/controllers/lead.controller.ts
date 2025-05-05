import { Request, Response, NextFunction } from "express";

const leadModel = require("../model/lead.model.js");
const helper = require("../lib/helper");
const config = require("../model/config.model.js");

/**
 * @desc Cria um lead, ou atualiza-o se existir um id como parâmetro no corpo da requisição
 * @param {object} req
 * @return {Number}
 */

async function createOrUpdateLead(req: Request, res: Response, next: NextFunction): Promise<any> {
    // console.log("lead.controler createOrUpdateLead req.body", req.body);
    // console.log("lead.controler createOrUpdateLead req.file", req.file);
    try {
        res.send("post lead construction");
        let lead = req.body;

        if (lead.nome_lead == "" || lead.origem_lead == "") {
            res.send({
                message: "Alguns campos são obrigatórios",
                status: "error"
            });
        } else {
            // if (req.file) {
            //     lead.foto_lead = req.file.filename;
            // } else {
            //     lead.foto_lead = "no-photo.jpg";
            // }
            
            if (lead.dtcad_lead == "") {
                lead.dtcad_lead = helper.convertToMySql();
            } else {
                lead.dtcad_lead = helper.convertToMySql(lead.dtcad_lead);
            }
    
            if (lead.id_lead) {
                lead = await leadModel.updateLead(lead);
                res.send({
                    message: "Lead atualizado com sucesso!",
                    status: "success"
                });
            } else {
                lead = await leadModel.insertLead(lead);
                lead.message = "Lead cadastrado com sucesso!";
                lead.status = "success";
                res.send(lead);
            }
        }
    } catch (err) {
        console.log("lead.controller createOrUpdateLead catch err", err);
        next(err);
    }
}

/**
 * @desc Pega os leads e devolve para o usuário
 * @return {Array}
 */
async function getLeads(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        res.send("get leads construction");
        // leads = await leadModel.getLeads();
    } catch (err) {
        console.log("lead.controller getleads catch err", err);
        next(err);
    }
}

/**
 * @desc Pega um lead pelo id e devolve para o usuário
 * @param {Number} id
 * @return {Array}
 */
async function getLead(req: Request, res: Response, next: NextFunction): Promise<any> {
    // console.log("lead.controller getlead req.params.id", req.params.id);
    try {
        res.send("get lead/id construction");
        let lead = await leadModel.getLead(req.params.id);
        let colors = await config.getColors();
    } catch (err) {
        console.log("lead.controller getlead catch err", err);
        next(err);
    }
}

/**
 * @desc Deleta um lead pelo id passado como parâmetro e retorna uma mensagem de erro ou sucesso
 * @param {Number} req
 * @return {object}
 */
async function deleteLead(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        res.send("post lead/id construction");
        let lead = await leadModel.deleteLead(req.params.id);
        // console.log("lead.controller deleteLead lead", lead);
        res.send({  
            message: "Lead apagado com sucesso! ",
            status: "success"
        });
    } catch (err) {
        console.log("lead.controller deleteLead catch err", err);
        next(err);
    }
}

module.exports = {
    createOrUpdateLead,
    getLeads,
    getLead,
    deleteLead,
};