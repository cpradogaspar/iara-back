const Analyses = require('../models/Analyses')
const tempConn = require('./tempConn')

class AnalysesDAO {
    create(props_and_values) {
        return new Promise((resolve, reject) => {
            Analyses.findAll({
                    where: {
                        date: new Date().toISOString().split('T')[0]
                    }
                })
                .then(result => {
                    let data_response = [];
                    result.forEach(data => {
                        data_response.push(data.dataValues);
                    });
                    // console.log(data_response)
                    if (data_response.length > 0) {
                        resolve(-1)
                    } else {
                        props_and_values.forEach(prop_and_value => {
                            Analyses.create({
                                    date: new Date().toISOString(),
                                    value: prop_and_value.value,
                                    analysis_type: prop_and_value.prop,
                                    user_id: prop_and_value.user_id,
                                })
                                .then()
                                .catch(err => reject(err))
                        })
                        resolve()
                    }
                })

        })
    }

    getDates() {
        return new Promise((resolve, reject) => {
            Analyses.findAll({
                    attributes: ['date'],
                    group: ["analyses.date"]
                })
                .then(result => {
                    let data_response = [];
                    result.forEach(data => {
                        data_response.push(data.dataValues);
                    });
                    resolve(data_response)
                })
                .catch(err => reject(err))
        })
    }


    //GAMBIARRAAAAA
    getAnalise(date) {
        return new Promise((resolve, reject) => {
            let conn = tempConn()

            conn.query(`
            SELECT 
                analysis_types.property as propriedade, 
                analyses.value as valor_da_analise, 
                analysis_types.measured_unit as unidade_medida,
                users.user_name as usuario,
                analyses.date as data 
            FROM analyses 
                inner join analysis_types on analysis_types.id = analyses.analysis_type
                inner join users on analyses.user_id = users.id
            WHERE
                analyses.date = ?
            `, [date], function (err, results, fields) {
                if (err) {
                    reject(err)
                } else {
                    let dataRaw = []
                    results.forEach(result => {
                        dataRaw.push({
                            propriedade: result.propriedade,
                            valor_da_analise: result.valor_da_analise,
                            unidade_medida: result.unidade_medida,
                            usuario: result.usuario,
                            data: result.data.toLocaleString()
                        })
                    })
                    conn.destroy()
                    resolve(dataRaw)
                }
            })



        })
    }
}

// const analys = new AnalysesDAO()

// analys.getDates()
//     .then(dates => console.log(dates))
//     .catch(err => console.log(err))

// analys.getAnalise('2019-11-12')
//     .then(analises => console.log(analises))
//     .catch(err => console.log(err))

// analys.create([
//     { prop: 1, value: 3, user_id: 1 },
//     { prop: 2, value: 7, user_id: 1 }
// ]).then(() => {
//     console.log("Analyse completed");
// }).catch(err => console.log(err))


module.exports = AnalysesDAO