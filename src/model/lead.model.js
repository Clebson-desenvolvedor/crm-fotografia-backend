const mysql = require("./mysql.js");

/**
 * @desc Insere um lead na base e devolve para controller
 * @param {object} client 
 * @returns {Array}
 */
function insertLead(lead) {
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
            mysql.getConnection((err, conn) => {
                conn.query(sql, values, (err, result) => {
                    // console.log("lead.model insertLead result", result);
                    if (err) {
                        console.log("lead.model insertLead conn.query err", err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                    conn.release();
                });
            });
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
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log("lead.model getLeads result", result);
                    if (err) {
                        console.log("lead.model getLeads conn.query err", err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
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
function getLead(id) {
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

            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    //   console.log("lead.model getLead result", result);
                    if (err) {
                        console.log("lead.model getLead conn.query err", err);
                        reject(err);
                    }
                    resolve(result);
                });
            });
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
function deleteLead(id) {
    // console.log("lead.model deleteLead id", id);
    return new Promise((resolve, reject) => {
        try {
            let sql = `DELETE FROM tb_leads WHERE id_lead = ${id}`;
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log("lead.model deleteLead result", result);
                    if (err) {
                        console.log("lead.model deleteLead conn.query err.sqlMessage: ", err.sqlMessage);
                        console.log("lead.model deleteLead conn.query err.errno:", err.errno);
                        return resolve(err)
                    }
                    resolve(result);
                    conn.release();
                });
            });
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

function updateLead(lead) {
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
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result, field) => {
                    // console.log("lead.model updateLead result", result);
                    if (err) {
                        console.log("lead.model updateLead conn.query err", err);
                        reject(err);
                        return;
                    }
                    resolve(result);
                    conn.release();
                });
            });
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
