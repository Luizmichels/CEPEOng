const routes = require('express').Router()

const UsuarioController = require('../controller/UsuarioController.js')


// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', UsuarioController.CadastroUsuario)

module.exports = routes