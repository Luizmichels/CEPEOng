const routes = require('express').Router()

const PessoaFisicaController = require('../controller/PessoaFisicaController')

// helpers
const { imageUpload } = require('../helpers/imagem-upload')


// Rotas

routes.post('/cadastro', imageUpload.array('imagens'),PessoaFisicaController.CadastPessoaFisica)


module.exports = routes