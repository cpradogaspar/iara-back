const AnalysisType = require('../Data/AnalysisTypeDAO')
const express = require('express')
const Router = express.Router()

const analysisType = new AnalysisType()

Router.post('/criar', (req, res) => {
    let property = req.body
    analysisType.criar(property)
        .then(() => res.sendStatus(200))
        .catch(err => res.json(err))

})

Router.delete('/deletar/:id', (req, res) => {
    let id = req.params.id

    analysisType.deletar(id)
        .then(() => res.sendStatus(200))
        .catch(err => res.json(err))
})

Router.get('/consultar', (req, res) => {
    analysisType.consultar()
        .then(props => res.send(props))
        .catch(err => res.json(err))
})

Router.put('/atualizar', (req, res) => {
    let property = req.body
    analysisType.atualizar(property)
        .then(() => res.sendStatus(200))
        .catch(err => res.json(err))
})

module.exports = Router