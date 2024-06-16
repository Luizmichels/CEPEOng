const routes = require('express').Router()
const ModalidadeController = require('../controller/ModalidadeController');
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken')

routes.post('/cadastro', ChecarToken,verificarNivelAcesso(3), ModalidadeController.cadastrarModalidade);
routes.patch('/editar/:CD_MODALIDADE', ChecarToken, verificarNivelAcesso(3), ModalidadeController.editarModalidade);
routes.get('/listar', ChecarToken, verificarNivelAcesso(3), ModalidadeController.listarModalidades);
routes.get('/obter/:CD_MODALIDADE', ChecarToken, verificarNivelAcesso(3), ModalidadeController.obterModalidade);
routes.delete('/deletar/:CD_MODALIDADE', ChecarToken, verificarNivelAcesso(3), ModalidadeController.deletarModalidade);

module.exports = routes;    
