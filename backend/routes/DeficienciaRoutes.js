const routes = require('express').Router()

const DeficienciaController = require('../controller/deficienciaController')


// middlewares


routes.post('/cadastro', DeficienciaController.CadastDeficiencia)
routes.get('/cadastratos', DeficienciaController.TodasDeficiencias)


module.exports = routes