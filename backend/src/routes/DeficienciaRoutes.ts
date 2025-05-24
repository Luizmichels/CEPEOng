import {Router} from 'express'
import DeficienciaController from '../controller/DeficienciaController.js'
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken.js'

const routes = Router();
const { CadastDeficiencia, TodasDeficiencias, BuscarPorID, DeletarDeficiencias, EditarDeficiencias } = DeficienciaController

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), CadastDeficiencia)
routes.get('/listar', ChecarToken, verificarNivelAcesso(1), TodasDeficiencias)
routes.get('/obter/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), BuscarPorID)
routes.delete('/deletar/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), DeletarDeficiencias)
routes.patch('/editar/:CD_DEFICIENCIA', ChecarToken, verificarNivelAcesso(3), EditarDeficiencias)


export default routes