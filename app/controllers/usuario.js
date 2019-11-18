const express = require("express");
const Router = express.Router();

const UsuarioDAO = require("../data/usuario");
const usuarioDAO = new UsuarioDAO();

Router.post("/registrar", (req, res) => {
  let usuario = req.body.usuario;

  usuarioDAO
    .registrar_usuario(usuario)
    .then(() => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.json({ err: err });
    });
});

Router.get("/login/:usuario/:senha", (req, res) => {
  let usuario = {
    usuario:req.params.usuario,
    senha:req.params.senha
  }
  console.log(usuario)
  usuarioDAO
    .login(usuario)
    .then(login => {
      console.log(login)
      if (login.LOGIN > 0) res.json(login.ID);
      else res.sendStatus(500);
    })
    .catch(err => {
      res.json({ err: err });
    });
});

Router.put("/config", (req,res)=>{
  let config = req.body.config
  console.log(config.usuarioID)

  usuarioDAO.config_propriedades(config)
  .then(()=>{
    res.sendStatus(200)
  })
  .catch(err => res.json({ err: err}))
})

module.exports = Router;
