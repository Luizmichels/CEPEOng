const routes = require("express").Router();
const PessoaFisicaController = require("../controller/PessoaFisicaController");

// helpers
const { imageUpload } = require("../helpers/imagem-upload");

// Rotas
routes.post(
  "/cadastro",
  imageUpload.fields([
    { name: "FOTO_RG", maxCount: 1 },
    { name: "FOTO_RG_RESPONS", maxCount: 1 },
    { name: "FOTO_ATLETA", maxCount: 1 },
  ]),
  PessoaFisicaController.CadastPessoaFisica
);

module.exports = routes;
