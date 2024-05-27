const routes = require('express').Router()

const DeficienciaController = require('../controller/DeficienciaController')

// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', DeficienciaController.CadastDeficiencia)
routes.get('/buscar', DeficienciaController.TodasDeficiencias)
routes.get('/buscar/:CD_DEFICIENCIA', DeficienciaController.BuscarPorID)
routes.delete('/deletar/:CD_DEFICIENCIA', DeficienciaController.DeletarDeficiencias)
routes.patch('/editar/:CD_DEFICIENCIA', DeficienciaController.EditarDeficiencias)


module.exports = routes