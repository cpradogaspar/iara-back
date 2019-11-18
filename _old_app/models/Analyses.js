const db = require('../Data/connectionFactory')

const Analyses = db.riverclean.define('analyses', {
    date: {
        type: db.Sequelize.DATEONLY,
        alowNull: false
    },
    value: {
        type: db.Sequelize.DOUBLE(10, 3),
        alowNull: false
    },
    analysis_type: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'analysis_types',
            key: 'id'
        }
    },
    user_id: {
        type: db.Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id'
        }
    }
})

// Analyses.sync({
//     force: true
// })


module.exports = Analyses