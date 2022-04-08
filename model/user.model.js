const mysql = require("./mysql").pool;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function insertUser(user) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(user.senha, 10, (errBc, hash) => {
      if (errBc) {
        res.send(errBc);
      }
      let sql = `INSERT INTO usuarios (email, senha) values (?,?)`;
      let values = [user.email, hash];
      mysql.getConnection((err, conn) => {
        conn.query(sql, values, (err, result) => {
          if (err) {
            result = err;
          }
          resolve(result);
          conn.release();
        });
      });
    });
  });
}

function loginUser(user) {
  return new Promise((resolve, reject) => {
    let query = `select * from usuarios where email = ?`;
    mysql.getConnection((err, conn) => {
      if (err) return err;
      conn.query(query, user.email, (err, result) => {
        conn.release();
        if (err) result = err;
        if (result.length < 1) {
          resolve(result);
        } else {
          bcrypt.compare(user.senha, result[0].senha, (err, result2) => {
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
  });
}

module.exports = {
  insertUser,
  loginUser,
};
