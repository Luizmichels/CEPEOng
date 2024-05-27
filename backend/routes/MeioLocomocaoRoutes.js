const routes = require('express').Router()

const MeioLocomocaoController = require('../controller/MeioLocomocaoController.js')
const ChecarToken = require('../helpers/VerificarToken.js')

// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', ChecarToken, MeioLocomocaoController.CadastroMeioLocomocao)
routes.delete('/deletar/:CD_MEIO_LOCOMOCAO', ChecarToken, MeioLocomocaoController.DeletarMeioLocomocao)
routes.patch('/editar/:CD_MEIO_LOCOMOCAO', ChecarToken, MeioLocomocaoController.EditarMeioLocomocao)
routes.get('/buscar/:CD_MEIO_LOCOMOCAO', MeioLocomocaoController.BuscarPorID)
routes.get('/buscar', MeioLocomocaoController.TodosMeios)


module.exports = routes