// controllers/PixController.js
import { criarCobrancaPix, gerarQrCodePix } from "../services/pixService";
import Pagamento from "../models/Pagamentos";

const ObterUsuarioToken = require("../helpers/ObterUsuarioToken");
const ObterToken = require("../helpers/ObterToken");
const ObterUltimoValor  = require("../helpers/UltValorMensalidade");

export default class PixController {
  static async criarCobranca(req, res) {
    try {
      const { parcelas } = req.body;
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);

      console.log(token, 'token')
      console.log(user, 'user')
      console.log(user.CD_USUARIO, 'usuariooooooooooooooooooooooooooooooooooooooooooooooo')

      if (!parcelas || !user.CD_USUARIO) {
        return res.status(400).json({ error: "Dados incompletos para criar a cobrança." });
      }

      try {
        const valorTotal = await ObterUltimoValor();

        if (valorTotal === null) {
          return res.status(400).json({ error: "Valor do pagamento não encontrado." });
        }

        const valorParcela = parcelas === 2 ? (parseFloat(valorTotal) / 2).toFixed(2) : parseFloat(valorTotal).toFixed(2);

        const dadosCobrancaPrimeiraParcela = {
          calendario: { expiracao: 3600 },
          valor: { original: valorParcela },
          chave: process.env.SUA_CHAVE_PIX,
          solicitacaoPagador: `Anuidade - Parcela ${parcelas === 2 ? '1/2' : 'Única'}`,
          // ... outros campos conforme necessário
        };

        const cobrancaPrimeiraParcelaCriada = await criarCobrancaPix(dadosCobrancaPrimeiraParcela);
        const qrCodeDataPrimeiraParcela = await gerarQrCodePix(cobrancaPrimeiraParcelaCriada.loc.id);

        await PixController.salvarInfoCobranca(
          user.CD_USUARIO,
          cobrancaPrimeiraParcelaCriada.txid,
          valorParcela,
          1,
          parcelas,
          new Date(),
          null
        );

        if (parcelas === 2) {
          const dataSegundaParcela = new Date();
          dataSegundaParcela.setMonth(dataSegundaParcela.getMonth() + 6);

          res.status(201).json({
            message: `Primeira parcela da anuidade criada. A segunda parcela de ${valorParcela} será cobrada em ${dataSegundaParcela.toLocaleDateString()}.`,
            cobranca: cobrancaPrimeiraParcelaCriada,
            qrcode: qrCodeDataPrimeiraParcela,
          });
        } else {
          res.status(201).json({
            message: "Anuidade paga em parcela única.",
            cobranca: cobrancaPrimeiraParcelaCriada,
            qrcode: qrCodeDataPrimeiraParcela,
          });
        }

      } catch (errorValorPagamento) {
        console.error("Erro ao obter valor do pagamento:", errorValorPagamento);
        return res.status(500).json({ error: "Erro ao obter valor do pagamento.", details: errorValorPagamento.message });
      }

    } catch (err) {
      res.status(500).json({ error: "Erro ao criar cobrança PIX", details: err.message });
    }
  }

  static async obterQrCode(req, res) {
    try {
      const locationId = req.params.locId; // Pega o ID da localização da URL
    if (!locationId) {
      return res.status(400).json({ error: "ID da localização (locId) é obrigatório"});
    }
    const qrCodeData = await gerarQrCodePix(locationId);
    res.status(200).json(qrCodeData);
    } catch (err) {
      res.status(500).json({ error: "Erro ao obter QR Code PIX", details: err.message });
    }
  }

  static async obterTokenTeste(req, res) {
    try {
      const token = await getValidToken(); // Usa a função com cache
      res.status(200).json({ access_token: token }); // Retorna apenas o token
    } catch (err) {
      res.status(500).json({ error: "Erro ao obter token PIX", details: err.message });
    }
  }

  static async salvarInfoCobranca(
    cdUsuario,
    txidGerencianet,
    valor,
    numeroParcela,
    totalParcela,
    dataCriacao,
    dataPagamento
  ) {
    try {
      await Pagamento.create({
        CD_USUARIO: cdUsuario, // Certifique-se de que a coluna no seu banco realmente se chama CD_USUARIO (case-sensitive)
        TXID_GERENCIANET: txidGerencianet,
        VALOR: parseFloat(valor),
        NUMERO_PARCELA: numeroParcela,
        TOTAL_PARCELA: totalParcela,
        DT_CRIACAO: dataCriacao,
        DT_PAGAMENTO: dataPagamento,
      });

      console.log("Informações da cobrança salvas no banco de dados.");
    } catch (error) {
      console.error("Erro ao salvar informações da cobrança:", error);
      throw error;
    }
  }

  static async webhook(req, res){
    console.log(req.body)
    res.send('200')
  }
}
