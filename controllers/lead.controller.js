const leadModel = require("../model/lead.model.js");
const helper = require("../lib/helper");
const config = require("../model/config.model.js");

/**
 * @desc Cria um lead, ou atualiza-o se existir um id como parâmetro no corpo da requisição
 * @param {object} req
 * @return {Number}
 */

async function createOrUpdateLead(req, res, next) {
    // console.log("lead.controler createOrUpdateLead req.body", req.body);
    // console.log("lead.controler createOrUpdateLead req.file", req.file);
    try {
        let lead = req.body;

        if (lead.nome_lead == "" || lead.origem_lead == "") {
            res.send({
                message: "Alguns campos são obrigatórios",
                status: "error"
            });
        } else {
            if (req.file) {
                lead.foto_lead = req.file.filename;
            } else {
                lead.foto_lead = "no-photo.jpg";
            }
            
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
async function getLeads(req, res, next) {
    try {
        leads = await leadModel.getLeads();
        let colors = await config.getColors();

        res.render("admin/leadsPage", {
            title: "Leads",
            leads: leads,
            colors: colors
        })
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
async function getLead(req, res, next) {
    // console.log("lead.controller getlead req.params.id", req.params.id);
    try {
        let lead = await leadModel.getLead(req.params.id);
        let colors = await config.getColors();
        // console.log("lead.controller getLead lead", lead);
        res.render("admin/leadPage", {
            title: lead.nome_lead,
            leadData: lead,
            colors: colors
        });
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
async function deleteLead(req, res, next) {
    try {
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