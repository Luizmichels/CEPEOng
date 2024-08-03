const routes = require("express").Router();
const PessoaFisicaController = require("../controller/PessoaFisicaController");

// helpers
const { imageUpload } = require("../helpers/imagem-upload");
const { ChecarToken,verificarNivelAcesso } = require("../helpers/VerificarToken");

// Rotas
routes.post(
  "/cadastro",
  ChecarToken,
  verificarNivelAcesso(1),
  PessoaFisicaController.CadastPessoaFisica
);
routes.patch(
  "/cadastro/editar/:CD_PESSOA_FISICA",
  ChecarToken,
  verificarNivelAcesso(1),
  PessoaFisicaController.editarPessoaFisica
);
routes.get(
  "/cadastrato",
  ChecarToken,
  verificarNivelAcesso(1),
  PessoaFisicaController.BuscarPorID
);
//grid
routes.get(
  "/cadastratos/grid",
  ChecarToken,
  verificarNivelAcesso(3),
  PessoaFisicaController.TodosCadastratos
);
routes.get(
  "/cadastratos/grid/tecnico",
  ChecarToken,
  verificarNivelAcesso(2),
  PessoaFisicaController.TodosCadastratosTec
);
routes.get(
  "/cadastratos/grid/exportar/:CD_PESSOA_FISICA",
  ChecarToken,
  verificarNivelAcesso(2),
  PessoaFisicaController.DadosFormatados
);
routes.patch(
  "/cadastratos/grid/editar/:CD_PESSOA_FISICA",
  ChecarToken,
  verificarNivelAcesso(2),
  imageUpload.fields([
    { name: "FOTO_RG", maxCount: 1 },
    { name: "FOTO_RG_RESPONS", maxCount: 1 },
    { name: "FOTO_ATLETA", maxCount: 1 },
  ]),
  PessoaFisicaController.editarPessoaFisicaGrid
);
routes.delete(
  "/cadastratos/grid/deletar/:CD_PESSOA_FISICA",
  ChecarToken,
  verificarNivelAcesso(3),
  PessoaFisicaController.excluirPessoaId
);

routes.post(
  "/imagens",
  ChecarToken,
  verificarNivelAcesso(1),
  imageUpload.single("file"),
  PessoaFisicaController.CadastImagens
);
routes.get('/listar/associados', ChecarToken, verificarNivelAcesso(3), PessoaFisicaController.TodasAssociados)
routes.get('/obter/:CD_USUARIO', ChecarToken, verificarNivelAcesso(1), PessoaFisicaController.BuscarPorID)

// consulta para contador e grafico
routes.get('/totalAssociados', ChecarToken, verificarNivelAcesso(3), PessoaFisicaController.getTotalAssociados)
routes.get('/modalidades', ChecarToken, verificarNivelAcesso(3), PessoaFisicaController.getModalidades)
routes.get('/totalTecnico/:CD_USUARIO', ChecarToken, verificarNivelAcesso(2), PessoaFisicaController.getTotalTecnico)
routes.get('/modalidadeTecnico/:CD_USUARIO', ChecarToken, verificarNivelAcesso(2), PessoaFisicaController.getModalidadesTecnico)

module.exports = routes;
