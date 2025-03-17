const routes = require('express').Router();
const DashController = require("../controller/DashController")

const { ChecarToken,verificarNivelAcesso } = require("../helpers/VerificarToken");

routes.get('/totalAssociados', ChecarToken, verificarNivelAcesso(3), DashController.getTotalAssociados)
routes.get('/modalidades', ChecarToken, verificarNivelAcesso(3), DashController.getModalidades)
routes.get('/totalTecnico/:CD_USUARIO', ChecarToken, verificarNivelAcesso(2), DashController.getTotalTecnico)
routes.get('/modalidadeTecnico/:CD_USUARIO', ChecarToken, verificarNivelAcesso(2), DashController.getModalidadesTecnico)

export default routes;