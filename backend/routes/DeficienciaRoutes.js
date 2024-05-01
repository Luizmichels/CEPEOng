const routes = require('express').Router()

const DeficienciaController = require('../controller/deficienciaController')


// middlewares


routes.post('/cadastro', DeficienciaController.CadastDeficiencia)


module.exports = routes