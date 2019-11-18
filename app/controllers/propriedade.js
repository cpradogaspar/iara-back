const express = require("express");
const Router = express.Router();

const PropriedadeDAO = require("../data/propriedade");
const propriedadeDAO = new PropriedadeDAO();

Router.get("/all", (req, res) => {
  propriedadeDAO
    .select_all()
    .then(propriedades => {
      res.json(propriedades);
    })
    .catch(err => res.json(err));
});

module.exports = Router;
