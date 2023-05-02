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
                let sql = `INSERT INTO tb_usuarios (email_usuario, senha_usuario) values (?,?)`;
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
    // console.log('Model: loginUser: user', user);
    return new Promise((resolve, reject) => {
        try {
            let query = `SELECT * FROM tb_usuarios WHERE email_usuario = ?`;
            mysql.getConnection((err_get_users, conn) => {
                if (err_get_users) return err_get_users;
                conn.query(query, user.email, (err_user_email, result_get_user) => {
                    conn.release();
                    if (err_user_email) {
                        console.log('user.model loginUser conn.query err_user_email', err_user_email);
                        return err_user_email;
                    }

                    if (result_get_user.length < 1) {
                        resolve(result);
                    } else {
                        bcrypt.compare(user.senha, result_get_user[0].senha_usuario, (err_bcrypt, result_bcrypt) => {
                            if (err_bcrypt) {
                                return err_bcrypt;
                            }

                            if (result_bcrypt) {
                                result_get_user.jwt = jwt.sign({
                                        idusuario: result_get_user[0].id_usuario,
                                        email: result_get_user[0].email_usuario,
                                    },
                                        process.env.JWT_KEY,
                                    {
                                        expiresIn: "1h",
                                    });
                            }
                            resolve(result_get_user);
                        });
                    }
                });
            });
        } catch (err_catch) {
            console.log('client.model loginUser catch err', err_catch);
        }
    });
}

module.exports = {
    insertUser,
    loginUser,
};
