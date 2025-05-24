import {Router} from 'express';
import usuario from '../controller/UsuarioController.js'
import { ChecarToken, verificarNivelAcesso } from '../helpers/VerificarToken.js'
const routes = Router()
const { CadastroUsuario, login, login2, DeletarUsuario, BuscarPorID, TodosUsuario, EditarUsuario, EditarNivelAcesso, CadastroTecModali, TodosNivel2, TecnicoModalidade, ObterTecnicoModalidade, EditarTecModali, DeletarTecModali, sendEmail, SolicitarSenhaTemporaria } = usuario

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), CadastroUsuario)
routes.post('/login', login)
routes.post('/validaPermissao', login2)
routes.delete('/deletar/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), DeletarUsuario)
routes.get('/obter/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), BuscarPorID)
routes.get('/listar', ChecarToken, verificarNivelAcesso(3), TodosUsuario)
routes.patch('/editar/senha/:CD_USUARIO', ChecarToken, verificarNivelAcesso(1), EditarUsuario)
routes.get('/buscar/editar/nivel_acesso', ChecarToken, verificarNivelAcesso(3), TodosUsuario)
routes.patch('/editar/nivel_acesso/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), EditarNivelAcesso)

routes.post('/cadastro/tecModali', ChecarToken, verificarNivelAcesso(3), CadastroTecModali)
routes.get('/listar/nivel2', ChecarToken, verificarNivelAcesso(3), TodosNivel2)
routes.get('/listar/tecModali', ChecarToken, verificarNivelAcesso(3), TecnicoModalidade)
routes.get('/obter/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), ObterTecnicoModalidade)
routes.patch('/editar/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), EditarTecModali)
routes.delete('/deletar/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), DeletarTecModali)

//email
routes.post('/mandar/email', sendEmail)
routes.post('/editar/senha/:email', SolicitarSenhaTemporaria)

export default routes