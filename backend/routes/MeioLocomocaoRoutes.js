const routes = require('express').Router()

const MeioLocomocaoController = require('../controller/MeioLocomocaoController.js')
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken')

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.CadastroMeioLocomocao)
routes.delete('/deletar/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.DeletarMeioLocomocao)
routes.patch('/editar/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.EditarMeioLocomocao)
routes.get('/obter/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.BuscarPorID)
routes.get('/listar', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.TodosMeios)


module.exports = routes