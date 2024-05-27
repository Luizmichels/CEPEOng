const routes = require("express").Router();
const PessoaFisicaController = require("../controller/PessoaFisicaController");

// helpers
const { imageUpload } = require("../helpers/imagem-upload");
const ChecarToken = require('../helpers/VerificarToken')

// Rotas
routes.post(
  "/cadastro", ChecarToken,
  imageUpload.fields([
    { name: "FOTO_RG", maxCount: 1 },
    { name: "FOTO_RG_RESPONS", maxCount: 1 },
    { name: "FOTO_ATLETA", maxCount: 1 },
  ]),
  PessoaFisicaController.CadastPessoaFisica
)
routes.get('/cadastratos', PessoaFisicaController.TodosCadastratos)
routes.patch('/cadastro/editar/:CD_PESSOA_FISICA', ChecarToken,
  imageUpload.fields([
    { name: "FOTO_RG", maxCount: 1 },
    { name: "FOTO_RG_RESPONS", maxCount: 1 },
    { name: "FOTO_ATLETA", maxCount: 1 },
  ]), PessoaFisicaController.editarPessoaFisica)
routes.delete('/deletar/:CD_PESSOA_FISICA', PessoaFisicaController.excluirPessoaId)

module.exports = routes;
