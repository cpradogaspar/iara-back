const User = require('../models/User')
const db = require('../databasesConnection/connectionFactory')
const SHA2 = require('sha2');

class UserDAO {
  register(data) {
    return new Promise((resolve, reject) => {
      let encryptedPass = SHA2["SHA-512"](data.password)
      User.create({
        user_name: data.user_name,
        password: encryptedPass.toString('hex'),
        email: data.email,
      }).then(() => {
        resolve()
      }).catch(err => reject(err))
    })

  }


  login(data) {
    return new Promise((resolve, reject) => {
      let encryptedPass = SHA2["SHA-512"](data.password)
      User.findAll({
        attributes: [
          [db.Sequelize.fn('COUNT', db.Sequelize.col('user_name')), 'login_confirmed']
        ],
        where: {
          user_name: data.user_name,
          //AND
          password: encryptedPass.toString('hex')
        }
      }).then((result) => {
        let login_result = result[0].dataValues.login_confirmed == 1
        resolve(login_result)
      }).catch(err => reject(err))
    })

  }

}





//EXPORTA O UserDAO
module.exports = UserDAO