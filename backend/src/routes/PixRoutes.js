// routes/pix.routes.js
import express from "express";
import PixController from "../controller/PixController";
import { ChecarToken } from "../helpers/VerificarToken";

const router = express.Router();

// Rota para CRIAR uma cobrança e obter o QR code
router.post("/cobranca", ChecarToken, PixController.criarCobrancaAnuidadeManual);

// Rota para OBTER QR
router.get("/qrcode/:locId", ChecarToken, PixController.obterQrCode);

// Rota de teste para obter token (opcional, talvez remover)
router.post("/testetoken", ChecarToken, PixController.obterTokenTeste);

// Rota para o frontend verificar se há anuidade pendente para o usuário logado
// Utilizar essa rota
router.get("/anuidade-pendente", ChecarToken, PixController.verificarAnuidadePendente);

// Rota para obter os detalhes do QR Code (imagem + copia e cola) de um pagamento específico
// Utilizar essa rota
router.get("/pagamento/:idPagamento/qrcode-details", ChecarToken, PixController.obterDetalhesQrCodePagamento);


router.post("/webhook", PixController.webhook);

export default router;