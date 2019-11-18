const Analyses = require('../Data/AnalysesDAO')
const express = require('express')
const Router = express.Router()

const analyses = new Analyses()

Router.post('/register', (req, res) => {
    props_and_values = req.body

    analyses.create(props_and_values)
        .then((resp) => {
            console.log(resp)
            if (resp === -1) res.json({
                dup: true
            })
            else res.json({
                cad: true
            })
        })
        .catch(err => res.json(err))
})

Router.get('/:date', (req, res) => {
    let date = req.params.date
    analyses.getAnalise(date)
        .then(analyses => res.json(analyses))
        .catch(err => res.json(err))
})

Router.put('/alld', (req, res) => {
    analyses.getDates()
        .then(dates => res.send(dates))
        .catch(err => res.json(err))
})
module.exports = Router