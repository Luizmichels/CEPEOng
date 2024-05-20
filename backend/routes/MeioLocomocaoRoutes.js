const routes = require('express').Router()

const MeioLocomocaoController = require('../controller/MeioLocomocaoController.js')

// get -> puxar info no banco - seleciona parametros do banco
// post -> insere info no banco
// patch -> altera os dados do banco
// delete -> deletar os dados do banco

routes.post('/cadastro', MeioLocomocaoController.CadastroMeioLocomocao)
routes.delete('/deletar/:CD_MEIO_LOCOMOCAO', MeioLocomocaoController.DeletarMeioLocomocao);
// routes.patch('/:id', MeioLocomocaoController.EditarMeioLocomocao)


module.exports = routes