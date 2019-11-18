const ModulesBackup = require("../backups/Modules")
const Module = require("../models/Module")


ModulesBackup.forEach(module => {
    Module.create({
        name: module.name,
        description: module.description
    })
    .then(()=> console.log("COMPLETED"))
    .catch(err => console.log(err))
})