// routes/pix.routes.js
import express from "express";
import PixController from "../controller/PixController";
const { ChecarToken } = require("../helpers/VerificarToken");

const router = express.Router();

// Rota para CRIAR uma cobrança e obter o QR code
router.post("/cobranca", ChecarToken, PixController.criarCobranca);

// Rota para OBTER QR code de uma cobrança existente pelo ID da localização
router.get("/qrcode/:locId", ChecarToken, PixController.obterQrCode);

// Rota de teste para obter token (opcional, talvez remover)
router.post("/testetoken", ChecarToken, PixController.obterTokenTeste);

router.post("/webhook", PixController.webhook);

export default router;