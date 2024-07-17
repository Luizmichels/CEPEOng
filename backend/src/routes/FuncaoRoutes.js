const routes = require('express').Router();
import FuncaoController from '../controller/FuncaoController';
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken';

const { cadastrarFuncao, listarFuncoes, obterFuncao, atualizarFuncao, deletarFuncao } = FuncaoController;

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), cadastrarFuncao);
routes.get('/listar', ChecarToken, verificarNivelAcesso(1), listarFuncoes);
routes.get('/listar2', listarFuncoes);
routes.get('/obter/:CD_FUNCAO', ChecarToken, verificarNivelAcesso(3), obterFuncao);
routes.patch('/atualizar/:CD_FUNCAO', ChecarToken, verificarNivelAcesso(3), atualizarFuncao);
routes.delete('/deletar/:CD_FUNCAO', ChecarToken, verificarNivelAcesso(3), deletarFuncao);

export default routes;
