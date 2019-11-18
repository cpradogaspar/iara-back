const db = require('../Data/connectionFactory') //importando as configs de conexão

//Criando Model (Tabela no banco de dados)
const User = db.riverclean.define('users', {
  user_name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
})


// User.sync({
//   force: true
// })

module.exports = User //exportando o model