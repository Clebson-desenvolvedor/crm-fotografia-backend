const mysql = require("../model/mysql.js").pool;

/**
 * @desc Rota para configuração
 * @param {object} req 
 */
async function getConfig(req, res, next) {
    console.log('Configuration getConfig');
    try {
        res.render('admin/configurationPage', {
            
        })
    } catch (err) {
        next(err);
    }
}

async function getColors(req, res, next) {
    console.log('getColors')
    return new Promise((resolve, reject) => {
        try {
            let sql = 'SELECT * FROM tb_configuracoes_cores LIMIT 1';
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result) => {
                    console.log('result', result[0])
                    if (err) {
                        reject(err);
                        return;
                    }
                    res.send(result[0])
                })
            })
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = {
    getConfig,
    getColors
};