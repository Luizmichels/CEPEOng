const routes = require('express').Router();
import ValorPagamento from '../controller/ValorPagamentoController';
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken';

const { cadastrarValor, listarUltValor, obterValor, atualizarValor, deletarValor} = ValorPagamento;

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), cadastrarValor);
routes.get('/listar', ChecarToken, listarUltValor);
routes.get('/obter/:CD_VALOR_PAGAMENTO', ChecarToken, verificarNivelAcesso(3), obterValor);
routes.patch('/atualizar/:CD_VALOR_PAGAMENTO', ChecarToken, verificarNivelAcesso(3), atualizarValor);
routes.delete('/deletar/:CD_VALOR_PAGAMENTO', ChecarToken, verificarNivelAcesso(3), deletarValor);

export default routes;
