import {Router} from 'express';
import DashController from "../controller/DashController";
import { ChecarToken,verificarNivelAcesso } from "../helpers/VerificarToken";

const routes = Router();

routes.get('/totalAssociados', ChecarToken, verificarNivelAcesso(3), DashController.getTotalAssociados)
routes.get('/modalidades', ChecarToken, verificarNivelAcesso(3), DashController.getModalidades)
routes.get('/totalTecnico/:CD_USUARIO', ChecarToken, verificarNivelAcesso(2), DashController.getTotalTecnico)
routes.get('/modalidadeTecnico/:CD_USUARIO', ChecarToken, verificarNivelAcesso(2), DashController.getModalidadesTecnico)

export default routes;