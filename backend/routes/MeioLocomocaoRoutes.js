const routes = require('express').Router()

const MeioLocomocaoController = require('../controller/MeioLocomocaoController.js')
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken')

// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.CadastroMeioLocomocao)
routes.delete('/deletar/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.DeletarMeioLocomocao)
routes.patch('/editar/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.EditarMeioLocomocao)
routes.get('/buscar/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.BuscarPorID)
routes.get('/buscar', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.TodosMeios)


module.exports = routes