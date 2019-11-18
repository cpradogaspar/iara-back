const Database = require("../database/connection");
const database = new Database();

class UsuarioDAO {
  registrar_usuario(usuario) {
    return new Promise((resolve, reject) => {
      let db = database.createConnection();

      let query = `
        INSERT INTO 
        usuario
        VALUES(
            DEFAULT, ?, ?, SHA2(?,512), ?, ?, ?, ?
        )
        `;
      db.query(
        query,
        [
          usuario.nome,
          usuario.usuario,
          usuario.senha,
          usuario.email,
          usuario.cidade,
          usuario.estado,
          usuario.pais
        ],
        function(err, results, fields) {
          if (err) {
            reject(err);
          } else {
            db.destroy();
            resolve();
          }
        }
      );
    });
  }

  login(usuario) {
    console.log(usuario)
    return new Promise((resolve, reject) => {
      let db = database.createConnection();

      let query = `
        SELECT count(*) as LOGIN ,
        usuario.id as ID
        FROM usuario
        WHERE
        usuario = ?
        AND
        senha = SHA2(?, 512)
        `;
      db.query(query, [usuario.usuario, usuario.senha], function(
        err,
        results,
        fields
      ) {
        if (err) {
          console.log(err)
          reject(err);
        } else {
          db.destroy();
          resolve({LOGIN:results[0].LOGIN, ID: results[0].ID});
        }
      });
    });
  }

  config_propriedades(config) {
    return new Promise((resolve, reject) => {
      let db = database.createConnection();

      let query = `
        INSERT INTO usuario_propriedade_config
        VALUES(
          ?, ?, ?, ?
          )
      `;

      db.query(
        query,
        [
          config.usuarioID,
          config.propriedadeID,
          config.valor_maximo,
          config.valor_minimo
        ],
        function(err, results, fields) {
          if (err) {
            reject(err);
          } else {
            db.destroy();
            resolve();
          }
        }
      );
    });
  }
}

module.exports = UsuarioDAO;

//==============================================================
// TESTES

//const usuarioDAO = new UsuarioDAO();

// usuarioDAO
//   .registrar_usuario({
//     nome: "Renato de Andrade Valim",
//     usuario: "admin",
//     senha: "admin",
//     email: "admin@email.com",
//     cidade: "Indaiatuba",
//     estado: "SP",
//     pais: "Brasil"
//   })
//   .then(() => console.log("USUÁRIO CADASTRADO COM SUCESSO"))
//   .catch(err => console.log(err));

// usuarioDAO
//   .login({
//     usuario: "admin",
//     senha: "admin"
//   })
//   .then(result => {
//     if (result > 0) {
//       console.log("USUÁRIO LOGADO COM SUCESSO");
//     } else {
//       console.log("Usuário ou senha inválidos");
//     }
//   })
//   .catch(err => console.log(err));
