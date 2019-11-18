const express = require("express");
const Router = express.Router();

const AnaliseAuxDAO = require("../data/analise_aux");
const analiseAuxDAO = new AnaliseAuxDAO();

Router.get("/historico/:propriedadeID", (req, res) => {
  let propriedadeID = req.params.propriedadeID;

  analiseAuxDAO
    .historico_propriedade(propriedadeID)
    .then(historico => {
      res.json(historico);
    })
    .catch(err => res.json(err));
});

module.exports = Router;
