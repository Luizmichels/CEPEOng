import Pagamento from "../models/Pagamentos.js";
import Usuario from "../models/usuario.js";
import { criarCobrancaPix, gerarQrCodePix } from "./pixService.js";
import ObterUltimoValor from "../helpers/UltValorMensalidade.js";

export default class AnuidadeService {

  static async verificarECriarCobrancaAnual(userId) {
    const numericUserId = parseInt(userId, 10);
    if (isNaN(numericUserId)) return;

    console.log(`Verificando anuidade para usuário CD_USUARIO: ${numericUserId}`);

    try {

      // 🟡 Verifica se já existe uma cobrança PENDENTE no ano atual
      const pagamentoPendente = await Pagamento.findOne({
        where: {
          CD_USUARIO: numericUserId,
          STATUS: 'PENDENTE'
        }
      });

      const usuarioCPF = await Usuario.findOne({
        where: { CD_USUARIO: userId },
        attributes: ['CPF', 'NOME']
      });

      if (!usuarioCPF) {
        console.error("Usuário não encontrado.");
        return;
      }

      const cpf = usuarioCPF.get('CPF') as string;
      const nome = usuarioCPF.get('NOME') as string;

      if (pagamentoPendente) {
        console.log(`Usuário ${numericUserId} já possui uma cobrança pendente para este ano.`);
        return;
      }

      console.log(`Iniciando criação de nova cobrança para usuário ${numericUserId}...`);

      const valorAnuidade = await ObterUltimoValor();
      if (valorAnuidade === null || isNaN(parseFloat(valorAnuidade))) {
        console.error("Valor da anuidade inválido.");
        return;
      }

      const valorFormatado = parseFloat(valorAnuidade).toFixed(2);
      const dadosCobrancaApi = {
        calendario: {
          expiracao: 3600
        },
        devedor: {
          cpf: cpf.replace(/[^\d]/g, ''),
          nome: nome || 'Nome não informado'
        },
        valor: {
          original: valorFormatado
        },
        chave: process.env.SUA_CHAVE_PIX,
        solicitacaoPagador: "Pagamento de anuidade",
      };

      const cobrancaCriadaGerencianet = await criarCobrancaPix(dadosCobrancaApi);

      let locationId = null;
      let pixCopiaECola = null;

      if (cobrancaCriadaGerencianet?.loc?.id) {
        locationId = cobrancaCriadaGerencianet.loc.id;
        pixCopiaECola = cobrancaCriadaGerencianet.pixCopiaECola || null;

        try {
          await gerarQrCodePix(locationId);
          console.log(`QR Code gerado com sucesso para Loc ID: ${locationId}`);
        } catch (qrError) {
          console.warn(`Erro ao gerar QR Code: ${qrError.message}`);
        }
      } else {
        console.error("Erro ao obter Loc ID ou pixCopiaECola.");
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

      console.log(`Cobrança salva no banco para usuário ${numericUserId}.`);

    } catch (error) {
      console.error(`Erro GERAL no serviço ao verificar/criar anuidade para usuário ${numericUserId}:`, error.response?.data || error.message || error);
    }
  }
}
