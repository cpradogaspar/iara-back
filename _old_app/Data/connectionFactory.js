const Sequelize = require("sequelize"); //Importando biblioteca sequelize
require("dotenv").config();

const riverclean = new Sequelize(
  process.env.DB_NAME || "iara_db",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "root", {
    //configuranco conexão com banco
    host: "localhost",
    dialect: "mysql"
  }
);

module.exports = {
  Sequelize: Sequelize,
  riverclean: riverclean
}; //exportando