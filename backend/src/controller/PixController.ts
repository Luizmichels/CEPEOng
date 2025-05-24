// controllers/PixController.js
import { criarCobrancaPix, gerarQrCodePix, getValidToken } from "../services/pixService.js"; // Adicionei getValidToken se for usar obterTokenTeste
import Pagamento from "../models/Pagamentos.js"
import { Op } from "sequelize";

// Helpers (verifique os caminhos corretos)
import ObterUsuarioToken from "../helpers/ObterUsuarioToken.js";
import ObterToken from "../helpers/ObterToken.js";
import ObterUltimoValor from "../helpers/UltValorMensalidade.js"; // Verifique se este é o helper correto para o VALOR da anuidae

export default class PixController {

  static async criarCobrancaAnuidadeManual(req, res) {
    try {
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);

      if (!user?.CD_USUARIO) return res.status(401).json({ error: "Usuário não autenticado ou token inválido." });

      const numericUserId = parseInt(user.CD_USUARIO, 10);

      const valorTotalAnuidade = await ObterUltimoValor();
      if (valorTotalAnuidade === null || isNaN(parseFloat(valorTotalAnuidade))) {
        return res.status(400).json({ error: "Valor da anuidade não encontrado ou inválido." });
      }
      const valorFormatado = parseFloat(valorTotalAnuidade).toFixed(2);
      const anoAtual = new Date().getFullYear();

      const cobrancaPendenteExistente = await Pagamento.findOne({
          where: {
              CD_USUARIO: numericUserId,
              STATUS: 'PENDENTE',
              DT_CRIACAO: { [Op.gte]: new Date(anoAtual, 0, 1)}
          },
          order: [['DT_CRIACAO', 'DESC']] // Pega a mais recente pendente
      });

      if (cobrancaPendenteExistente) {
          console.log(`Cobrança pendente já existe para usuário ${numericUserId} (TxID: ${cobrancaPendenteExistente.TXID_GERENCIANET}). Gerando QR Code existente.`);
          try {
               return res.status(200).json({
                 message: "Já existe uma cobrança pendente para este ano.",
                 cobranca: {
                    txid: cobrancaPendenteExistente.TXID_GERENCIANET,
                    valor: cobrancaPendenteExistente.VALOR,
                    status: cobrancaPendenteExistente.STATUS,
                    dataCriacao: cobrancaPendenteExistente.DT_CRIACAO
                 },
               });
          } catch(qrError) {
               console.error("Erro ao tentar gerar QR code para cobrança pendente existente:", qrError);
               return res.status(500).json({ error: "Cobrança pendente existe, mas falhou ao gerar QR code.", details: qrError.message });
          }
      }

      console.log(`Criando nova cobrança manual de anuidade ${anoAtual} para usuário ${numericUserId}...`);
      const dadosCobrancaApi = {
        calendario: { expiracao: 3600 * 24 * 7 },
        valor: { original: valorFormatado },
        chave: process.env.SUA_CHAVE_PIX,
        solicitacaoPagador: `Anuidade ${anoAtual}`,
        infoAdicionais: [
            { nome: "UsuarioID", valor: numericUserId.toString() },
            { nome: "Referencia", valor: anoAtual.toString() }
        ]
      };

      const cobrancaCriadaGerencianet = await criarCobrancaPix(dadosCobrancaApi);

      const novoPagamento = await Pagamento.create({
        CD_USUARIO: numericUserId,
        TXID_GERENCIANET: cobrancaCriadaGerencianet.txid,
        VALOR: valorFormatado,
        NUMERO_PARCELA: 1,
        TOTAL_PARCELA: 1,
        DT_CRIACAO: new Date(cobrancaCriadaGerencianet.calendario.criacao),
        DT_PAGAMENTO: null,
        STATUS: 'PENDENTE',
        LOC_ID_GERENCIANET: cobrancaCriadaGerencianet.loc?.id,
        PIX_COPIA_E_COLA: cobrancaCriadaGerencianet.pixCopiaECola
      });
      console.log(`Cobrança manual criada e salva (CD_PAGAMENTO: ${novoPagamento.CD_PAGAMENTO}). Gerando QR code...`);

      const qrCodeData = await gerarQrCodePix(cobrancaCriadaGerencianet.loc.id);

      res.status(201).json({
        message: "Cobrança de anuidade criada com sucesso.",
        cobranca: {
            txid: novoPagamento.TXID_GERENCIANET,
            valor: novoPagamento.VALOR,
            status: novoPagamento.STATUS,
            dataCriacao: novoPagamento.DT_CRIACAO
        },
        qrcode: qrCodeData,
      });

    } catch (err) {
       console.error("Erro detalhado ao criar cobrança PIX manual:", err.response?.data || err.message || err);
       if (err.response?.data) {
           return res.status(err.response.status || 500).json({
               error: "Erro ao comunicar com a API PIX",
               details: err.response.data
           });
       }
       res.status(500).json({ error: "Erro interno ao processar cobrança PIX", details: err.message });
    }
  }

  static async obterQrCode(req, res) {
    try {
      const locationId = req.params.locId;
      if (!locationId) {
        return res.status(400).json({ error: "ID da localização (locId) é obrigatório"});
      }
      const qrCodeData = await gerarQrCodePix(locationId);
      res.status(200).json(qrCodeData);
    } catch (err) {
       console.error("Erro ao obter QR Code PIX:", err.response?.data || err.message || err);
      res.status(500).json({ error: "Erro ao obter QR Code PIX", details: err.message });
    }
  }

  static async obterTokenTeste(req, res) {
    try {
      const token = await getValidToken();
      res.status(200).json({ access_token: token });
    } catch (err) {
      res.status(500).json({ error: "Erro ao obter token PIX", details: err.message });
    }
  }

  static async webhook(req, res){
    console.log("---- Webhook Recebido ----");
    console.log("Headers:", JSON.stringify(req.headers, null, 2)); // Log headers para depuração
    console.log("Body:", JSON.stringify(req.body, null, 2)); // Log body JSON

    // TODO: Implementar a lógica do Webhook:
    // 1. Verificar assinatura/autenticidade da requisição (MUITO IMPORTANTE para segurança)
    //    - A Gerencianet geralmente envia um header específico ou usa mTLS. Verifique a documentação deles.
    // 2. Identificar o tipo de notificação (ex: 'pagamento_recebido', 'pix_recebido')
    //    - Dentro de req.body, procure por campos como `tipo_notificacao` ou a estrutura do payload PIX.
    // 3. Extrair dados relevantes (ex: txid, valor pago, data/hora do pagamento).
    //    - O payload PIX (`req.body.pix[0]` talvez?) contém essas informações.
    // 4. Buscar o pagamento correspondente no banco de dados usando o TXID.
    //    - `const pagamento = await Pagamento.findOne({ where: { TXID_GERENCIANET: txid_do_webhook } });`
    // 5. Se encontrar o pagamento e ele estiver PENDENTE:
    //    - Atualizar o STATUS para 'PAGO'.
    //    - Atualizar a DT_PAGAMENTO com a data/hora do pagamento real.
    //    - `await pagamento.update({ STATUS: 'PAGO', DT_PAGAMENTO: data_pagamento_webhook });`
    // 6. Se não encontrar, ou se já estiver PAGO, logar a informação.

    // Responder à Gerencianet com 200 OK para confirmar o recebimento.
    // É importante responder rápido para evitar retentativas da Gerencianet.
    res.status(200).send('OK');
    console.log("---- Webhook Processado (Placeholder) ----");
  }

  static async verificarAnuidadePendente(req, res) {
    try {
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);
  
      if (!user?.CD_USUARIO) {
        return res.status(401).json({ error: "Usuário não autenticado." });
      }
      const numericUserId = parseInt(user.CD_USUARIO, 10);
      const hoje = new Date();
      const anoAtual = hoje.getFullYear();
  
      const pagamentoPendente = await Pagamento.findOne({
        where: {
          CD_USUARIO: numericUserId,
          STATUS: 'PENDENTE',
          DT_CRIACAO: { [Op.gte]: new Date(anoAtual, 0, 1) } // Pendente deste ano
        },
        order: [['DT_CRIACAO', 'DESC']],
        // *** BUSCAR O LOC_ID SALVO ***
        attributes: ['CD_PAGAMENTO', 'VALOR', 'DT_CRIACAO', 'TXID_GERENCIANET', 'LOC_ID_GERENCIANET']
      });
  
      if (pagamentoPendente && pagamentoPendente.LOC_ID_GERENCIANET) {
        // Encontrou pendente E tem o locId necessário
        res.status(200).json({
          pendente: true,
          pagamento: {
              cdPagamento: pagamentoPendente.CD_PAGAMENTO,
              valor: pagamentoPendente.VALOR,
              dataCriacao: pagamentoPendente.DT_CRIACAO,
              txid: pagamentoPendente.TXID_GERENCIANET,
              locId: pagamentoPendente.LOC_ID_GERENCIANET // Retorna o locId para o frontend!
          }
        });
      } else if (pagamentoPendente) {
          // Encontrou pendente mas SEM locId (erro no salvamento anterior?)
          console.warn(`Pagamento pendente ${pagamentoPendente.CD_PAGAMENTO} encontrado sem LOC_ID_GERENCIANET.`);
          res.status(200).json({ pendente: true, pagamento: { cdPagamento: pagamentoPendente.CD_PAGAMENTO }, error: "Dados da cobrança PIX incompletos no servidor." });
      } else {
          // Nenhuma pendente encontrada
        res.status(200).json({ pendente: false });
      }
  
    } catch (error) {
      console.error("Erro ao verificar anuidade pendente:", error);
      res.status(500).json({ error: "Erro ao verificar status da anuidade", details: error.message });
    }
  }

  static async obterDetalhesQrCodePagamento(req, res) {
    try {
      const token = ObterToken(req);
      const user = await ObterUsuarioToken(token);
      const idPagamento = req.params.idPagamento;

      if (!user?.CD_USUARIO) {
         return res.status(401).json({ error: "Usuário não autenticado." });
      }

      const pagamento = await Pagamento.findOne({
          where: {
              CD_PAGAMENTO: idPagamento,
              CD_USUARIO: user.CD_USUARIO
          }
      });

      if (!pagamento) {
         return res.status(404).json({ error: "Pagamento não encontrado ou pertence a outro usuário." });
      }
      if (pagamento.STATUS !== 'PENDENTE') {
         return res.status(400).json({ error: `Este pagamento está com status ${pagamento.STATUS}, não é possível gerar PIX.` });
      }
      if (!pagamento.LOC_ID_GERENCIANET) {
         console.error(`LOC_ID_GERENCIANET não encontrado para CD_PAGAMENTO ${idPagamento}`);
         return res.status(400).json({ error: "ID de localização não encontrado para este pagamento. Não é possível gerar QR Code." });
      }
      if (!pagamento.PIX_COPIA_E_COLA) {
          console.error(`PIX_COPIA_E_COLA não encontrado para CD_PAGAMENTO ${idPagamento}`);
           return res.status(400).json({ error: "Código Copia e Cola não encontrado para este pagamento." });
      }

      console.log(`Gerando imagem QR Code para Loc ID: ${pagamento.LOC_ID_GERENCIANET}`);
      const qrCodeData = await gerarQrCodePix(pagamento.LOC_ID_GERENCIANET);

      res.status(200).json({
          pixCopiaECola: pagamento.PIX_COPIA_E_COLA,
          imagemQrcode: qrCodeData.imagemQrcode
      });

    } catch (err) {
       console.error(`Erro ao obter detalhes QR Code para pagamento ${req.params.idPagamento}:`, err.response?.data || err.message || err);
       if (err.response?.data) {
           return res.status(err.response.status || 500).json({
               error: "Erro ao gerar imagem do QR Code na API PIX",
               details: err.response.data
           });
       }
       res.status(500).json({ error: "Erro interno ao obter detalhes do QR Code PIX", details: err.message });
    }
  }
}