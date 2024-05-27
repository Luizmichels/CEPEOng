const routes = require('express').Router()

const DeficienciaController = require('../controller/DeficienciaController')
const ChecarToken = require('../helpers/VerificarToken.js')

// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', ChecarToken, DeficienciaController.CadastDeficiencia)
routes.get('/buscar', ChecarToken, DeficienciaController.TodasDeficiencias)
routes.get('/buscar/:CD_DEFICIENCIA', ChecarToken, DeficienciaController.BuscarPorID)
routes.delete('/deletar/:CD_DEFICIENCIA', ChecarToken, DeficienciaController.DeletarDeficiencias)
routes.patch('/editar/:CD_DEFICIENCIA', ChecarToken, DeficienciaController.EditarDeficiencias)


module.exports = routes