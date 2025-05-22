const routes = require("express").Router();
const PessoaFisicaController = require("../controller/PessoaFisicaController");

// helpers
const { imageUpload } = require("../helpers/imagem-upload");
const { ChecarToken,verificarNivelAcesso } = require("../helpers/VerificarToken");

// Rotas
routes.post("/cadastro", ChecarToken, verificarNivelAcesso(1), PessoaFisicaController.CadastPessoaFisica);
routes.patch("/cadastro/editar/:CD_USUARIO", ChecarToken, verificarNivelAcesso(1), PessoaFisicaController.editarPessoaFisica);
routes.get("/cadastrato", ChecarToken, verificarNivelAcesso(1), PessoaFisicaController.BuscarPorID);
routes.get("/associados/dados/:CD_USUARIO", ChecarToken, verificarNivelAcesso(1), PessoaFisicaController.DadosAssociados);
//grid
routes.get("/cadastratos/grid", ChecarToken, verificarNivelAcesso(3), PessoaFisicaController.TodosCadastratos);
routes.get("/cadastratos/grid/tecnico", ChecarToken, verificarNivelAcesso(2), PessoaFisicaController.TodosCadastratosTec);
routes.get("/cadastratos/grid/exportar/:CD_PESSOA_FISICA", ChecarToken, verificarNivelAcesso(1), PessoaFisicaController.DadosFormatados);
routes.delete("/cadastratos/grid/deletar/:CD_PESSOA_FISICA",ChecarToken, verificarNivelAcesso(3), PessoaFisicaController.excluirPessoaId);

routes.post(
  "/imagens",
  ChecarToken,
  verificarNivelAcesso(1),
  imageUpload.single("file"),
  PessoaFisicaController.CadastImagens
);
routes.get('/listar/associados', ChecarToken, verificarNivelAcesso(3), PessoaFisicaController.TodasAssociados)
routes.get('/obter/:CD_USUARIO', ChecarToken, verificarNivelAcesso(1), PessoaFisicaController.BuscarPorCdUsuario)

module.exports = routes;
