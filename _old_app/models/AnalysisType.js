const db = require('../Data/connectionFactory') //importando as configs de conexão

//Criando Model (Tabela no banco de dados)
const AnalysisType = db.riverclean.define('analysis_types', {
    property: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    measured_unit: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    max_value: {
        type: db.Sequelize.DOUBLE(10, 3),
        allowNull: false
    },
    min_value: {
        type: db.Sequelize.DOUBLE(10, 3),
        allowNull: false
    }
})


// AnalysisType.sync({
//     force: true
// })

module.exports = AnalysisType //exportando o model