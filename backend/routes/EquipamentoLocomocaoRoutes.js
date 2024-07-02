const routes = require('express').Router()

const EquipamentoLocomocaoController = require('../controller/EquipamentoLocomocaoController.js')
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken.js')

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), EquipamentoLocomocaoController.CadastroEquipamentos)
routes.delete('/deletar/:CD_EQUIPAMENTO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), EquipamentoLocomocaoController.DeletarEquipamentos)
routes.patch('/editar/:CD_EQUIPAMENTO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), EquipamentoLocomocaoController.EditarEquipamentos)
routes.get('/obter/:CD_EQUIPAMENTO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), EquipamentoLocomocaoController.BuscarPorID)
routes.get('/listar', ChecarToken, verificarNivelAcesso(3), EquipamentoLocomocaoController.TodosEquipamentos)


module.exports = routes