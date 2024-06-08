const routes = require('express').Router()
const UsuarioController = require('../controller/UsuarioController.js')
const { ChecarToken, verificarNivelAcesso } = require('../helpers/VerificarToken')

// routes.post('/cadastro', ChecarToken, verificarNivelAcesso(3), UsuarioController.CadastroUsuario)
routes.post('/cadastro', UsuarioController.CadastroUsuario)
routes.post('/login', UsuarioController.login)
routes.delete('/deletar/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), UsuarioController.DeletarUsuario)
routes.get('/buscar/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), UsuarioController.BuscarPorID)
routes.get('/buscar', ChecarToken, verificarNivelAcesso(3), UsuarioController.TodosUsuario)
routes.patch('/buscar/editar/:CD_USUARIO', ChecarToken, verificarNivelAcesso(1), UsuarioController.EditarUsuario)
routes.get('/buscar/editar/nivel_acesso', ChecarToken, verificarNivelAcesso(3), UsuarioController.TodosUsuario)
routes.patch('/buscar/editar/nivel_acesso/:CD_USUARIO', ChecarToken, verificarNivelAcesso(3), UsuarioController.EditarNivelAcesso)

module.exports = routes