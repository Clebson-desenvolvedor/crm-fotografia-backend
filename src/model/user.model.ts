import pool from "../infra/db/mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @desc insere um novo usuário na base
 * @param {object} user 
 * @returns {object}
 */
// function insertUser(user: any) {
//     // console.log("user.model insertUser user", user);
//     return new Promise((resolve, reject) => {
//         try {
//             bcrypt.hash(user.senha, 10, (errBc, hash) => {
//                 if (errBc) {
//                     console.log("user.model insertUser errBc", errBc);
//                     res.send({ status: 500, erro: errBc });
//                 }

//                 let sql = `INSERT INTO tb_usuarios (email_usuario, senha_usuario) values (?,?)`;
//                 let values = [user.email, hash];

//                 mysql.getConnection((err, conn) => {
//                     conn.query(sql, values, (err, result) => {
//                         // console.log("user.model insertUser result", result);
//                         console.log("user.model insertUser conn.query err", err);
//                         if (err) {
//                             result = err;
//                         }
//                         resolve(result);
//                         conn.release();
//                     });
//                 });
//             });
//         } catch (err) {
//             console.log("client.model insertUser catch err", err);
//         }
//     });
// }

/**
 * @desc valida se existe um usuário com as credenciais passadas como parâmetro e faz login
 * @param {*} user 
 * @returns {object}
 */
async function loginUser(user: any) {
    console.log("model: user: loginUser");

    let query = `SELECT * FROM tb_usuarios WHERE email_usuario = ?`;
    try {
        const conn = await pool.getConnection();
        const [ result_get_user ]: any = await conn.query(query, [user.email]);

        conn.release();

        if (result_get_user.length < 1) {
            return false;
        }

        const isMatch = await bcrypt.compare(user.senha, result_get_user[0].senha_usuario);

        if (!isMatch) return false;

        const TOKEN = jwt.sign({ id: result_get_user[0].id_usuario }, "segredo", { expiresIn: "6h" });

        return {
            id_usuario: result_get_user[0].id_usuario,
            nome_usuario: result_get_user[0].nome_usuario,
            token: TOKEN
        };

    } catch (err) {
        console.error("model: user: loginUser error", err);
        throw err;
    }
}

function salvaTokenUsuario (usuario: any) {
    return new Promise((resolve, reject) => {
        try {
            console.log("Model: user: salvaTokenUsuario usuario", usuario);

            let query = `
                UPDATE tb_usuarios
                SET token_auth_usuario = "${usuario.token}",
                duracao_token_usuario = "2023-05-20 00:00:00"
                WHERE id_usuario = ${usuario[0].id_usuario}
            `;

            // mysql.getConnection((err_salvaTokenUsuario, conn) => {
            //     if (err_salvaTokenUsuario) return err_salvaTokenUsuario;
            //     conn.query(query, (err_atualiza_token_usuario, result_atualiza_token_usuario) => {
            //         conn.release();
            //         if (err_atualiza_token_usuario) {
            //             // console.log("Model: user: salvaTokenUsuario err_atualiza_token_usuario", err_atualiza_token_usuario);
            //             reject(err_atualiza_token_usuario);
            //             return;
            //         }
            //         resolve(result_atualiza_token_usuario);
            //     });
            // });
        } catch (catch_err_salvaTokenUsuario) {
            console.log("Model: user: salvaTokenUsuario catch", catch_err_salvaTokenUsuario);
        }
    })
}

module.exports = {
    loginUser,
};
