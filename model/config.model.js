const mysql = require("./mysql.js").pool;

function getColors() {
    return new Promise((resolve, reject) => {
        try {
            let sql = 'SELECT * FROM tb_configuracoes_cores LIMIT 1';
            mysql.getConnection((err, conn) => {
                conn.query(sql, (err, result) => {
                    // console.log('result[0]', result[0]);
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result[0]);
                })
            })
        } catch (catch_error) {
            console.log("model: config.model: getColors: cath ", catch_error);
        }
    });
}

module.exports = {
    getColors
}