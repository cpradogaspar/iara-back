const Database = require("../database/connection");
const database = new Database();

class PropriedadeDAO {
  select_all() {
    return new Promise((resolve, reject) => {
      let db = database.createConnection();

      let query = `
            SELECT * FROM propriedade
            `;

      db.query(query, [], function(err, results, fields) {
        if (err) reject(err);
        else {
          db.destroy();
          resolve(results);
        }
      });
    });
  }
}

module.exports = PropriedadeDAO;
