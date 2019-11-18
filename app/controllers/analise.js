const express = require("express");
const Router = express.Router();

const AnaliseDAO = require("../data/analise");
const analiseDAO = new AnaliseDAO();

Router.post("/registrar/:id", (req, res) => {
  let usuarioID = req.params.id;

  analiseDAO
    .registrar_analise(usuarioID)
    .then((analiseID) => {
      res.json(analiseID);
    })
    .catch(err => res.json({ err: err }));
});

Router.get("/all", (req, res) => {
  analiseDAO
    .todas_analises()
    .then(analises => {
      console.log(analises);
      res.json(analises);
    })
    .catch(err => res.json({ err: err }));
});

module.exports = Router;
