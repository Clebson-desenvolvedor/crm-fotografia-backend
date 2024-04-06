const mysql = require("../model/mysql.js").pool;
const configModel = require("../model/config.model.js");

/**
 * @desc Rota para configuração
 * @param {object} req 
 */
async function getConfig(req, res, next) {
    let colors = await getColors();
    try {
        res.render('admin/configurationPage', {
            colors: colors
        });
    } catch (err) {
        next(err);
    }
}

async function getColors() {
    return new Promise((resolve, reject) => {
        try {
            let colors = configModel.getColors();
        } catch (error) {
            console.log(error);
        }
    })
}

async function updateColors(req, res, next) {
    return new Promise((resolve, reject) => {
        try {
            let sql = `
            UPDATE tb_configuracoes_cores SET
            cor_painel_lateral = '${req.body.cor_painel_lateral}',
            cor_texto_painel_lateral = '${req.body.cor_texto_painel_lateral}',
            cor_icone_painel_lateral = '${req.body.cor_icones_painel_lateral}',
            cor_texto_painel_principal = '${req.body.cor_texto_painel_principal}'
            WHERE id_cor = 1 
            `;
            
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    res.status(200).send({mensagem: "Cores atualizadas com Sucesso!"})
                })
            })
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = {
    getConfig,
    getColors,
    updateColors
};