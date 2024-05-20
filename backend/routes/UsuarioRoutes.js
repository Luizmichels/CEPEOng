const routes = require('express').Router()

const UsuarioController = require('../controller/UsuarioController.js')
const ChecarToken = require('../helpers/VerificarToken.js')

// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', UsuarioController.CadastroUsuario)
routes.get('/login', ChecarToken, UsuarioController.login)
//routes.get('/ChecarUsuario', UsuarioController.ChecarUsuario)
//routes.get('/:CdUsuario', UsuarioController.CdUsuario)
//routes.patch('/:EditarUsuario', ChecarToken, UsuarioController.editarUsuario)


module.exports = routes