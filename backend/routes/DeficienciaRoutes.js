const routes = require('express').Router()

const DeficienciaController = require('../controller/DeficienciaController')
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken')

// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), DeficienciaController.CadastDeficiencia)
routes.get('/buscar', ChecarToken, verificarNivelAcesso(3), DeficienciaController.TodasDeficiencias)
routes.get('/buscar/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), DeficienciaController.BuscarPorID)
routes.delete('/deletar/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), DeficienciaController.DeletarDeficiencias)
routes.patch('/editar/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), DeficienciaController.EditarDeficiencias)


module.exports = routes