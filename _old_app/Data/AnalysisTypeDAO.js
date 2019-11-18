const AnalysisType = require("../models/AnalysisType");

class AnalysisTypeDAO {

  consultar() {
    return new Promise((resolve, reject) => {
      AnalysisType.findAll({
        attributes: ["id", "property", "measured_unit", "max_value", "min_value"]
      })
        .then(result => {
          let data_response = [];
          result.forEach(data => {
            data_response.push(data.dataValues);
          });
          resolve(JSON.stringify(data_response))
        })
        .catch(err => {
          reject(err);
        });
    })
  }

  criar(data) {
    return new Promise((resolve, reject) => {
      AnalysisType.create({
        property: data.property,
        measured_unit: data.measured_unit,
        max_value: data.max_value,
        min_value: data.min_value
      })
        .then(() => {
          resolve()
        })
        .catch(err => reject(err));
    })

  };

  deletar(id) {
    return new Promise((resolve, reject) => {
      AnalysisType.destroy({
        where: {
          id: id
        }
      })
        .then(() => resolve())
        .catch(err => reject(err))
    })
  }

  atualizar(data) {
    return new Promise((resolve, reject) => {
      AnalysisType.update({
        property: data.property,
        measured_unit: data.measured_unit,
        max_value: data.max_value,
        min_value: data.min_value
      }, {
          where: {
            id: data.id
          }
        })
        .then(() => resolve())
        .catch(err => reject(err))
    })
  }


}


module.exports = AnalysisTypeDAO
