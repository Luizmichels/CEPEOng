const routes = require('express').Router();
const FuncaoController = require('../controller/FuncaoController');
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken');

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), FuncaoController.cadastrarFuncao);
routes.get('/listar', ChecarToken, verificarNivelAcesso(3), FuncaoController.listarFuncoes);
routes.get('/obter/:CD_FUNCAO', ChecarToken, verificarNivelAcesso(3), FuncaoController.obterFuncao);
routes.patch('/atualizar/:CD_FUNCAO', ChecarToken, verificarNivelAcesso(3), FuncaoController.atualizarFuncao);
routes.delete('/deletar/:CD_FUNCAO', ChecarToken, verificarNivelAcesso(3), FuncaoController.deletarFuncao);

module.exports = routes;
