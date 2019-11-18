const Database = require("../database/connection");
const database = new Database();

class AnaliseAuxDAO {
  registrar_analise_aux(analise_aux, resultado) {
    console.log(analise_aux)
    console.log(resultado)
    return new Promise((resolve, reject) => {
      let db = database.createConnection();
      let query = `
        INSERT INTO analise_aux
        VALUES(
            ?,?,?,?
        )
        `;
      db.query(
        query,
        [
          analise_aux.analiseID,
          analise_aux.propriedadeID,
          analise_aux.valor,
          resultado
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

  historico_propriedade(propriedadeID) {
    console.log(propriedadeID)
    return new Promise((resolve, reject) => {
      let db = database.createConnection();
      let resultRaw = {
        valores: [],
        media: 0,
        maximo: 0,
        minimo: 0
      };
      let query = `
        SELECT 
            analise_aux.valor_analise as valor
            FROM analise_aux
            inner join propriedade on analise_aux.propriedadeID = propriedade.id
            inner join analise on analise_aux.analiseID = analise.id
            WHERE propriedade.id = ?
            ORDER BY analise.data_analise DESC
            LIMIT 5;
        `;

      db.query(query, [propriedadeID], function(err, results, fields) {
        if (err) reject(err);
        else {
          results.forEach(valor => {
            resultRaw.valores.push(valor.valor);
          });
          let query = `
          SELECT id from analise order by id desc limit 5;
          `

          db.query(query, [], function(err, results, fields){
            let ultimas = results.map(function(id){
              return id.id
            })
            

            let query = `
            SELECT 
                max(analise_aux.valor_analise) as maximo,
                min(analise_aux.valor_analise) as minimo
                FROM analise_aux
                inner join propriedade on analise_aux.propriedadeID = propriedade.id
                inner join analise on analise_aux.analiseID = analise.id
                WHERE propriedade.id = ?
                ORDER BY analise.data_analise DESC
                LIMIT 5;
          `;
          db.query(query, [
            propriedadeID
          ], function(err, results, fields) {
            resultRaw.maximo = results[0].maximo,
            resultRaw.minimo = results[0].minimo
            resultRaw.valores.forEach(valor =>{
              resultRaw.media += parseFloat(valor)
            })

            resultRaw.media /= 5
            db.destroy();
            console.log(resultRaw)
            resolve(resultRaw);
          });
          })
        }
      });
    });
  }

  ultima_analise() {
    return new Promise((resolve, reject) => {
      let db = database.createConnection();
      let query = `
        SELECT
            analise_aux.propriedadeID as propriedade, 
            analise_aux.valor_analise as valor,
            analise_aux.resultado as resultado
            FROM analise_aux
            inner join propriedade on analise_aux.propriedadeID = propriedade.id
            inner join analise on analise_aux.analiseID = analise.id
            ORDER BY analise.data_analise DESC
            LIMIT 5;
        `;

      db.query(query, [], function(err, results, fields) {
        if (err) reject(err);
        else {
          resolve(results)
        }
      });
    });
  }
}

// const analiseAuxDAO = new AnaliseAuxDAO();

// let analiseID = 2;
// let props = [
//   { id: 1, valor: 1, resultado: 1 },
//   { id: 2, valor: 12, resultado: 0 },
//   { id: 3, valor: 22, resultado: 1 },
//   { id: 4, valor: 43, resultado: 9 },
//   { id: 5, valor: 21, resultado: 0 }
// ];

// props.forEach(prop => {
//   analiseAuxDAO
//     .registrar_analise_aux({
//       analiseID: analiseID,
//       propriedadeID: prop.id,
//       valor: prop.valor,
//       resultado: prop.resultado
//     })
//     .then()
//     .catch(err => console.log(err));
// });

module.exports = AnaliseAuxDAO;
