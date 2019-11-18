const AnalysisTypeBackup = require("./AnalysisType");
const AnalysisType = require("../models/AnalysisType");

AnalysisType.sync({
  force: true
})
  .then(() => {
    AnalysisTypeBackup.forEach(prop => {
      AnalysisType.create({
        property: prop.property,
        measured_unit: prop.measured_unit,
        max_value: prop.max_value,
        min_value: prop.min_value
      })
        .then(() => console.log("COMPLETED"))
        .catch(err => console.log(err));
    });
  })
  .catch(err => console.log(err));
