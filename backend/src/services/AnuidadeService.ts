import Pagamento from "../models/Pagamentos.js";
import { criarCobrancaPix, gerarQrCodePix } from "./pixService.js";
import ObterUltimoValor from "../helpers/UltValorMensalidade.js";

const ANO_EM_MILISSEGUNDOS = 365 * 24 * 60 * 60 * 1000; // Aproximação

export default class AnuidadeService {

  static async verificarECriarCobrancaAnual(userId) {
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) { /* ... tratamento de erro ... */ return; }

    console.log(`Verificando anuidade para usuário CD_USUARIO: ${numericUserId}`);
    try {
      if (precisaCriarNovaCobranca) {
        console.log(`Iniciando criação de nova cobrança para usuário ${numericUserId}...`);
        const valorAnuidade = await ObterUltimoValor();
        if (valorAnuidade === null || isNaN(parseFloat(valorAnuidade))) { /* ... erro ... */ return; }

        const valorFormatado = parseFloat(valorAnuidade).toFixed(2);
        const anoReferenciaAtual = new Date().getFullYear();
        const dadosCobrancaApi = { /* ... dados para API ... */ };

        const cobrancaCriadaGerencianet = await criarCobrancaPix(dadosCobrancaApi);

        let locationId = null;
        let pixCopiaECola = null;

        if (cobrancaCriadaGerencianet && cobrancaCriadaGerencianet.loc && cobrancaCriadaGerencianet.loc.id) {
           locationId = cobrancaCriadaGerencianet.loc.id;
           pixCopiaECola = cobrancaCriadaGerencianet.pixCopiaECola || null;
           console.log(`Cobrança criada. Loc ID: ${locationId}, Pix Copia/Cola obtido direto.`);

           try {
               await gerarQrCodePix(locationId);
               console.log(`Geração de QR Code para Loc ID ${locationId} funcionou.`);
           } catch (qrError) {
               console.warn(`Aviso: Cobrança criada (Loc ID: ${locationId}), mas falha ao gerar/testar QR code: ${qrError.message}`);
           }

        } else {
            console.error("Erro crítico: Não foi possível obter loc.id ou pixCopiaECola após criar cobrança na Gerencianet.");
            return;
        }

        const novoPagamento = await Pagamento.create({
          CD_USUARIO: numericUserId,
          TXID_GERENCIANET: cobrancaCriadaGerencianet.txid,
          VALOR: valorFormatado,
          NUMERO_PARCELA: 1,
          TOTAL_PARCELA: 1,
          DT_CRIACAO: new Date(cobrancaCriadaGerencianet.calendario.criacao),
          DT_PAGAMENTO: null,
          STATUS: 'PENDENTE',
          LOC_ID_GERENCIANET: locationId,
          PIX_COPIA_E_COLA: pixCopiaECola
        });

        console.log(`Nova cobrança salva no DB (CD_PAGAMENTO: ${novoPagamento.CD_PAGAMENTO}) para usuário ${numericUserId}.`);

      } else {
         console.log(`Nenhuma nova cobrança necessária para usuário ${numericUserId}.`);
      }

    } catch (error) {
      console.error(`Erro GERAL no serviço ao verificar/criar anuidade para usuário ${numericUserId}:`, error.response?.data || error.message || error);
    }
  }
};
