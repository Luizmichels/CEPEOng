// ValorPagamentoRoutes.js
const routes = require('express').Router();
import ValorPagamento from '../controller/ValorPagamentoController';
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken';

const { inicializarValor, listarValorUnico, atualizarValorUnico } = ValorPagamento;

routes.post('/inicializar', inicializarValor); // Rota para inicializar o valor (será chamada uma vez)
routes.get('/listar', ChecarToken, listarValorUnico); // Rota para obter o único valor
routes.patch('/atualizar', ChecarToken, verificarNivelAcesso(3), atualizarValorUnico); // Rota para atualizar o único valor

module.exports = routes;


export default routes;