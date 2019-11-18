const logger = require("morgan");
const express = require("express");
const middlewares = require("./middlewares");
const usuario = require("../app/controllers/usuario");
const analise = require("../app/controllers/analise");
const graph = require("../app/controllers/graficos");
const proprieade = require("../app/controllers/propriedade");
const analise_aux = require('../app/controllers/analise_aux')

module.exports = function() {
  const app = express();

  app.set("port", process.env.PORT || 4000);

  app.use(logger("dev"));

  middlewares(app);

  //ROTAS:
  app.get("/", (req, res) => res.json("[ SERVER ON ]"));

  app.use("/usuario", usuario);
  app.use("/analise", analise);
  app.use("/graph", graph);
  app.use("/propriedade", proprieade);
  app.use('/analise_aux', analise_aux)
  // app.use('/analises', analyses)
  // app.use('/sensor', sensor)

  return app;
};
