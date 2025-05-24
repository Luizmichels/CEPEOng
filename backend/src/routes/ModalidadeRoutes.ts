import {Router} from 'express';
import modelidade from '../controller/ModalidadeController.js';
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken.js';
const routes = Router()
const { cadastrarModalidade, editarModalidade, listarModalidades, obterModalidade, deletarModalidade } = modelidade

routes.post('/cadastro', ChecarToken,verificarNivelAcesso(3), cadastrarModalidade);
routes.patch('/editar/:CD_MODALIDADE', ChecarToken, verificarNivelAcesso(3), editarModalidade);
routes.get('/listar', ChecarToken, verificarNivelAcesso(1), listarModalidades);
routes.get('/obter/:CD_MODALIDADE', ChecarToken, verificarNivelAcesso(3), obterModalidade);
routes.delete('/deletar/:CD_MODALIDADE', ChecarToken, verificarNivelAcesso(3), deletarModalidade);

export default routes;    
