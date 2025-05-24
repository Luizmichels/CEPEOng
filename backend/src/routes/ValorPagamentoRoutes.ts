// ValorPagamentoRoutes.js
import {Router} from 'express';
import ValorPagamento from '../controller/ValorPagamentoController.js';
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken.js';
const routes = Router()

const { inicializarValor, listarValorUnico, atualizarValorUnico } = ValorPagamento;

routes.post('/inicializar', inicializarValor); // Rota para inicializar o valor (será chamada uma vez)
routes.get('/listar', ChecarToken, listarValorUnico); // Rota para obter o único valor
routes.patch('/atualizar', ChecarToken, verificarNivelAcesso(3), atualizarValorUnico); // Rota para atualizar o único valor

export default routes;