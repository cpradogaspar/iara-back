const express = require("express");
const Router = express.Router();

const Database = require('../database/connection')
const database = new Database()

const AnaliseAuxDAO = require("../data/analise_aux");
const analiseAuxDAO = new AnaliseAuxDAO();

Router.post("/registrar/:id", (req, res) => {
  let db = database.createConnection()
  let analise = req.body;
  db.query('SELECT valor_maximo, valor_minimo FROM usuario_propriedade_config WHERE usuarioID = ? AND propriedadeID = ?',
  [req.params.id, req.body.propriedadeID], function(err, results, fields){
    if(err) console.log(err)
    let resultado = parseFloat(req.body.valor) <= parseFloat(results[0].valor_maximo) && parseFloat(req.body.valor) >= parseFloat(results[0].valor_minimo) ? 1 : 0
    analiseAuxDAO
    .registrar_analise_aux(analise, resultado)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => res.json({ err: err }));
});
  }
  )

  //db.destroy()
Router.get('/ultima', (req,res)=>{
  analiseAuxDAO.ultima_analise()
  .then(analise => {
    res.json(analise)
  })
  .catch(err => res.json(err))
})
  

module.exports = Router