import {Router} from 'express';

import MeioLocomocaoController from '../controller/MeioLocomocaoController.js'
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken'
const routes = Router()

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.CadastroMeioLocomocao)
routes.delete('/deletar/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.DeletarMeioLocomocao)
routes.patch('/editar/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.EditarMeioLocomocao)
routes.get('/obter/:CD_MEIO_LOCOMOCAO', ChecarToken, verificarNivelAcesso(3), MeioLocomocaoController.BuscarPorID)
routes.get('/listar', ChecarToken, verificarNivelAcesso(1), MeioLocomocaoController.TodosMeios)


export default routes