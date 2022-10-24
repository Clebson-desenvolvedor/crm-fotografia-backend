const mysql = require("./mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/**
 * @desc insere um novo usuário na base
 * @param {object} user 
 * @returns {object}
 */
function insertUser(user) {
    // console.log('user.model insertUser user', user);
    return new Promise((resolve, reject) => {
        try {
            bcrypt.hash(user.senha, 10, (errBc, hash) => {
                if (errBc) {
                    console.log('user.model insertUser errBc', errBc);
                    res.send(errBc);
                }
                let sql = `INSERT INTO usuarios (email, senha) values (?,?)`;
                let values = [user.email, hash];
                mysql.getConnection((err, conn) => {
                    conn.query(sql, values, (err, result) => {
                        // console.log('user.model insertUser result', result);
                        console.log('user.model insertUser conn.query err', err);
                        if (err) {
                            result = err;
                        }
                        resolve(result);
                        conn.release();
                    });
                });
            });
        } catch (err) {
            console.log('client.model insertUser catch err', err);
        }
    });
}

/**
 * @desc valida se existe um usuário com as credenciais passadas como parâmetro e faz login
 * @param {*} user 
 * @returns {object}
 */
function loginUser(user) {
    // console.log('user.model loginUser user', user);
    return new Promise((resolve, reject) => {
        try {
            let query = `select * from usuarios where email = ?`;
            mysql.getConnection((err, conn) => {
                if (err) return err;
                conn.query(query, user.email, (err, result) => {
                    // console.log('user.model loginUser result', result);
                    console.log('user.model loginUser conn.query err', err);
                    conn.release();
                    if (err) result = err;
                    if (result.length < 1) {
                        resolve(result);
                    } else {
                        bcrypt.compare(user.senha, result[0].senha, (err, result2) => {
                            // console.log('user.model loginUser result2', result2);
                            console.log('user.model loginUser conn.query #2', err);
                            if (err) return err;
                            result.password = result2;
                            if (result.password) {
                                result.jwt = jwt.sign(
                                    {
                                        idusuario: result[0].idusuario,
                                        email: result[0].email,
                                    },
                                    process.env.JWT_KEY,
                                    {
                                        expiresIn: "1h",
                                    }
                                );
                            }
                            resolve(result);
                        });
                    }
                });
            });
        } catch (err) {
            console.log('client.model loginUser catch err', err);
        }
    });
}

module.exports = {
    insertUser,
    loginUser,
};
