import pool from "./mysql";

/**
 * @desc Insere um lead na base e devolve para controller
 * @param {object} client 
 * @returns {Array}
 */
async function insertLead(lead: any) {
    // console.log("lead.model insertLead lead", lead);
    return new Promise((resolve, reject) => {
        try {
            let sql = `
            INSERT INTO tb_leads (
                nome_lead,
                whatsapp_lead, 
                email_lead,  
                dtcad_lead, 
                foto_lead,
                origem_lead
            ) VALUES (?,?,?,?,?,?)`;

            let values = [
                lead.nome_lead,
                lead.whatsapp_lead,
                lead.email_lead,
                lead.dtcad_lead,
                lead.foto_lead,
                lead.origem_lead
            ];
            // console.log("lead.model insertLead values", values);
            // mysql.getConnection((err, conn) => {
                const resultado = pool.query(sql, values);
            // });
        } catch (err) {
            console.log("lead.model insertLead catch err", err);
        }
    });
}

/**
 * @desc pega os leads da base e devolve para controller
 * @returns {Array}
 */
function getLeads() {
    // console.log("lead.model getLeads");
    return new Promise((resolve, reject) => {
        try {
            let sql = "SELECT id_lead, nome_lead, whatsapp_lead, foto_lead, origem_lead FROM tb_leads";
            // mysql.getConnection((err, conn) => {
            const resultado = pool.query(sql);
                
            // });
        } catch (err) {
            console.log("lead.model getLeads catch err", err);
            throw err;
        }
    });
}

/**
 * @desc Pega um lead da base pelo id
 * @param {number} id 
 * @returns {object}
 */
function getLead(id: number) {
    // console.log("lead.model getLead");
    // console.log("lead.model getLead id", id);
    return new Promise((resolve, reject) => {
        try {
            let sql = `
            SELECT
                id_lead,
                nome_lead, 
                DATE_FORMAT(dtcad_lead, "%d/%m/%y") as dtcad_lead, 
                email_lead,
                whatsapp_lead,
                foto_lead,
                origem_lead
            FROM tb_leads
            WHERE id_lead = ${id}`;

           const resultado = pool.query(sql);
        } catch (err) {
            console.log("lead.model getLead catch err", err);
        }
    });
}

/**
 * @desc deleta um lead da base através do id passado como parâmetro e retorna uma resposta de erro 
 * ou sucesso
 * @param {number} id 
 * @returns {Array}
 */
function deleteLead(id: number) {
    // console.log("lead.model deleteLead id", id);
    return new Promise((resolve, reject) => {
        try {
            let sql = `DELETE FROM tb_leads WHERE id_lead = ${id}`;
            const resultado = pool.query(sql);
        } catch (err) {
            console.log("lead.model deleteLead catch err", err);
        }
    });
}

/**
 * @desc atualiza um lead na base passando o próprio lead como parâmetro e devolve uma 
 * mensagem de erro ou sucesso
 * @param {object} client 
 * @returns {object}
 */

function updateLead(lead: any) {
    // console.log("lead.model updateLead");
    // console.log("lead.model updatelead lead", lead);
    return new Promise((resolve, reject) => {
        try {
            let sql = `
                UPDATE tb_leads SET 
                nome_lead = "${lead.nome_lead}", 
                dtcad_lead = "${lead.dtcad_lead}", 
                email_lead = "${lead.email_lead}", 
                whatsapp_lead = "${lead.whatsapp_lead}",
                foto_lead = "${lead.foto_lead}",
                origem_lead = "${lead.origem_lead}"
                WHERE id_lead = ${lead.id_lead}`;
            // console.log("lead.model updateLead sql", sql);
            const resultado = pool.query(sql);
        } catch (err) {
            console.log("lead.model updateLead catch err", err);
        }
    });
}

module.exports = {
    insertLead,
    getLeads,
    getLead,
    deleteLead,
    updateLead,
};
