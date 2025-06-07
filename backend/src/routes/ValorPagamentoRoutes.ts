// ValorPagamentoRoutes.js
import {Router} from 'express';
import ValorPagamento from '../controller/ValorPagamentoController.js';
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken.js';
const routes = Router()

const { listarValorUnico, atualizarValorUnico } = ValorPagamento;

routes.get('/listar', ChecarToken, listarValorUnico); // Rota para obter o único valor
routes.patch('/atualizar', ChecarToken, verificarNivelAcesso(3), atualizarValorUnico); // Rota para atualizar o único valor

export default routes;