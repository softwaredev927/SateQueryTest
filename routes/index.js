const express = require('express')
const indexRouter = express.Router()
const SatePage = require('./sate')

function routes(app, db) {
    indexRouter.get('/', (req, res) => {
        res.render("index")
    })
    indexRouter.get('/sate', SatePage)
    app.use(indexRouter)
}

module.exports = routes