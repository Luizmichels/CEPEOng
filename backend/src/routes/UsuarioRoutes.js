const routes = require('express').Router()
const UsuarioController = require('../controller/UsuarioController.js')
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken')

routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), UsuarioController.CadastroUsuario)
routes.post('/login', UsuarioController.login)
routes.post('/validaPermissao', UsuarioController.login2)
routes.delete('/deletar/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), UsuarioController.DeletarUsuario)
routes.get('/obter/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), UsuarioController.BuscarPorID)
routes.get('/listar', ChecarToken, verificarNivelAcesso(3), UsuarioController.TodosUsuario)
routes.patch('/editar/senha/:CD_USUARIO', ChecarToken, verificarNivelAcesso(1), UsuarioController.EditarUsuario)
routes.get('/buscar/editar/nivel_acesso', ChecarToken, verificarNivelAcesso(3), UsuarioController.TodosUsuario)
routes.patch('/editar/nivel_acesso/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), UsuarioController.EditarNivelAcesso)

routes.post('/cadastro/tecModali', ChecarToken, verificarNivelAcesso(3), UsuarioController.CadastroTecModali)
routes.get('/listar/nivel2', ChecarToken, verificarNivelAcesso(3), UsuarioController.TodosNivel2)
routes.get('/listar/tecModali', ChecarToken, verificarNivelAcesso(3), UsuarioController.TecnicoModalidade)
routes.get('/obter/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), UsuarioController.ObterTecnicoModalidade)
routes.patch('/editar/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), UsuarioController.EditarTecModali)
routes.delete('/deletar/tecModali/:CD_TECNICO_MODALIDADE', ChecarToken, verificarNivelAcesso(3), UsuarioController.DeletarTecModali)

//email
routes.post('/mandar/email', UsuarioController.sendEmail)
routes.post('/editar/senha/:email', UsuarioController.SolicitarSenhaTemporaria)

module.exports = routes