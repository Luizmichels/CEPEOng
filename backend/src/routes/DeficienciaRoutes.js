const routes = require('express').Router()

const DeficienciaController = require('../controller/DeficienciaController')
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken')

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), DeficienciaController.CadastDeficiencia)
routes.get('/listar', ChecarToken, verificarNivelAcesso(3), DeficienciaController.TodasDeficiencias)
routes.get('/obter/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), DeficienciaController.BuscarPorID)
routes.delete('/deletar/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), DeficienciaController.DeletarDeficiencias)
routes.patch('/editar/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), DeficienciaController.EditarDeficiencias)


module.exports = routes