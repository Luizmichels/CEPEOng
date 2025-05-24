import {Router} from 'express';
import pessoa from "../controller/PessoaFisicaController";

// helpers
import { imageUpload } from "../helpers/imagem-upload";
import { ChecarToken, verificarNivelAcesso } from "../helpers/VerificarToken";
const routes = Router()
const { CadastPessoaFisica, editarPessoaFisica, BuscarPorID, DadosAssociados, TodosCadastratos, TodosCadastratosTec, DadosFormatados, excluirPessoaId, CadastImagens, TodasAssociados, BuscarPorCdUsuario } = pessoa

// Rotas
routes.post("/cadastro", ChecarToken, verificarNivelAcesso(1), CadastPessoaFisica);
routes.patch("/cadastro/editar/:CD_USUARIO", ChecarToken, verificarNivelAcesso(1), editarPessoaFisica);
routes.get("/cadastrato", ChecarToken, verificarNivelAcesso(1), BuscarPorID);
routes.get("/associados/dados/:CD_USUARIO", ChecarToken, verificarNivelAcesso(1), DadosAssociados);
//grid
routes.get("/cadastratos/grid", ChecarToken, verificarNivelAcesso(3), TodosCadastratos);
routes.get("/cadastratos/grid/tecnico", ChecarToken, verificarNivelAcesso(2), TodosCadastratosTec);
routes.get("/cadastratos/grid/exportar/:CD_PESSOA_FISICA", ChecarToken, verificarNivelAcesso(1), DadosFormatados);
routes.delete("/cadastratos/grid/deletar/:CD_PESSOA_FISICA",ChecarToken, verificarNivelAcesso(3), excluirPessoaId);

routes.post(
  "/imagens",
  ChecarToken,
  verificarNivelAcesso(1),
  imageUpload.single("file"),
  CadastImagens
);
routes.get('/listar/associados', ChecarToken, verificarNivelAcesso(3), TodasAssociados)
routes.get('/obter/:CD_USUARIO', ChecarToken, verificarNivelAcesso(1), BuscarPorCdUsuario)

export default routes;
