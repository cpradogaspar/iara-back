const Database = require("../database/connection");
const database = new Database();

class AnaliseDAO {
  registrar_analise(usuarioID) {
    return new Promise((resolve, reject) => {
      let db = database.createConnection();

      let data_analise = new Date()
        .toISOString()
        .replace("T", " ")
        .replace("Z", "");

      let query = `
            INSERT INTO analise
            VALUES(
                DEFAULT, ?, ?
            )
            `;
      db.query(query, [data_analise, usuarioID], function(
        err,
        results,
        fields
      ) {
        if (err) {
          reject(err);
        } else {
          db.destroy();
          resolve(results.insertId);
        }
      });
    });
  }

  todas_analises() {
    return new Promise((resolve, reject) => {
      let db = database.createConnection();

      let query = `
        SELECT * FROM analise
        `;

      db.query(query, [], function(err, results, fields) {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }

  analise_diaria() {
    return new Promise((resolve, reject) => {});
  }
}

module.exports = AnaliseDAO;

// const analiseDAO = new AnaliseDAO();

// analiseDAO
//   .registrar_analise(1)
//   .then(analiseID => {
//     console.log(analiseID);
//   })
//   .catch(err => console.log(err));
