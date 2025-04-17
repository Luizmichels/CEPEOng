// services/AnuidadeService.js
import { criarCobrancaPix } from "./pixService"; // Sua função que chama /v2/cob
import { ObterUltimoValor } from "./valorPagamentoService"; // Função que busca o valor atual da anuidade
// Importe seu Model/ORM para interagir com o banco de dados (ex: Sequelize)
import CobrancaAnualModel from "../models/CobrancaAnual";

const ANO_EM_MILISSEGUNDOS = 365 * 24 * 60 * 60 * 1000; // Aproximação, cuidado com anos bissextos se precisar de exatidão total

export default class AnuidadeService {

  static async verificarECriarCobrancaAnual(userId) {
    console.log(`Verificando anuidade para usuário: ${userId}`);
    try {
      // 1. Buscar a ÚLTIMA cobrança PAGA deste usuário
      const ultimaCobrancaPaga = await CobrancaAnualModel.findOne({
        where: {
          userId: userId,
          status: 'PAGO' // Ou dataPagamento: { [Op.ne]: null }
        },
        order: [
          ['dataPagamento', 'DESC'] // Ordena pela data de pagamento mais recente
        ]
      });

      const hoje = new Date();
      let precisaCriarNovaCobranca = false;

      if (!ultimaCobrancaPaga) {
        // 2. Caso A/B: Nunca pagou ou nunca teve cobrança registrada como paga
        console.log(`Usuário ${userId} nunca pagou anuidade ou não há registro pago. Verificando se existe cobrança pendente para o ano atual.`);

        // Opcional: Verificar se já existe uma PENDENTE para o ano atual antes de criar outra
        const anoAtual = hoje.getFullYear();
        const cobrancaPendenteAnoAtual = await CobrancaAnualModel.findOne({
            where: {
                userId: userId,
                anoReferencia: anoAtual, // Se você adicionar este campo
                status: 'PENDENTE'
            }
        });

        if (!cobrancaPendenteAnoAtual) {
             precisaCriarNovaCobranca = true;
             console.log(`Nenhuma cobrança pendente encontrada para ${anoAtual}. Necessário criar nova cobrança.`);
        } else {
            console.log(`Já existe cobrança pendente para ${anoAtual}. Nenhuma ação necessária.`);
        }

      } else {
        // 3. Caso C: Encontrou a última cobrança paga
        const dataUltimoPagamento = ultimaCobrancaPaga.dataPagamento;
        const umAnoAtras = new Date(hoje.getTime() - ANO_EM_MILISSEGUNDOS);
        // Uma forma mais robusta de calcular 1 ano atrás:
        // const umAnoAtras = new Date(hoje);
        // umAnoAtras.setFullYear(hoje.getFullYear() - 1);

        console.log(`Último pagamento em: ${dataUltimoPagamento}. Comparando com 1 ano atrás: ${umAnoAtras}`);

        if (dataUltimoPagamento < umAnoAtras) {
          // 4. Pagamento tem mais de 1 ano
           console.log(`Último pagamento foi há mais de um ano. Verificando pendente para ${hoje.getFullYear()}.`);
           // Opcional: Verificar se já existe uma PENDENTE para o ano atual antes de criar outra
           const anoAtual = hoje.getFullYear();
           const cobrancaPendenteAnoAtual = await CobrancaAnualModel.findOne({
               where: {
                   userId: userId,
                   anoReferencia: anoAtual,
                   status: 'PENDENTE'
               }
           });
           if (!cobrancaPendenteAnoAtual) {
               precisaCriarNovaCobranca = true;
               console.log(`Nenhuma cobrança pendente encontrada para ${anoAtual}. Necessário criar nova cobrança.`);
           } else {
                console.log(`Já existe cobrança pendente para ${anoAtual}. Nenhuma ação necessária.`);
           }
        } else {
          // 5. Pagamento está em dia (menos de 1 ano)
          console.log(`Pagamento da anuidade está em dia para usuário ${userId}.`);
        }
      }

      // 6. Criar nova cobrança, se necessário
      if (precisaCriarNovaCobranca) {
        console.log(`Iniciando criação de nova cobrança para usuário ${userId}...`);
        const valorAnuidade = await ObterUltimoValor(); // Busca o valor atual

        if (valorAnuidade === null || isNaN(parseFloat(valorAnuidade))) {
          console.error(`Erro: Valor da anuidade inválido ou não encontrado.`);
          return; // Ou lançar um erro
        }

        const valorFormatado = parseFloat(valorAnuidade).toFixed(2);
        const anoReferenciaAtual = hoje.getFullYear();

        const dadosCobranca = {
          calendario: { expiracao: 3600 * 24 * 7 }, // Ex: Expira em 7 dias
          valor: { original: valorFormatado },
          chave: process.env.SUA_CHAVE_PIX,
          solicitacaoPagador: `Anuidade ${anoReferenciaAtual}`,
           infoAdicionais: [
             { nome: "Associado ID", valor: userId.toString() },
             { nome: "Referência", valor: anoReferenciaAtual.toString() }
           ]
          // Adicionar dados do devedor (usuário logado) pode ser útil
        };

        const cobrancaCriada = await criarCobrancaPix(dadosCobranca); // Chama API Gerencianet

        // Salva no banco de dados local
        await CobrancaAnualModel.create({
          userId: userId,
          txid: cobrancaCriada.txid,
          valor: valorFormatado,
          status: 'PENDENTE', // Status inicial
          dataCriacao: new Date(cobrancaCriada.calendario.criacao),
          dataPagamento: null, // Pagamento ainda não ocorreu
          anoReferencia: anoReferenciaAtual // Salva o ano
        });
        console.log(`Nova cobrança PIX (TxID: ${cobrancaCriada.txid}) criada para usuário ${userId} referente a ${anoReferenciaAtual}.`);

        // **Opcional:** Gerar QR Code aqui? Provavelmente não é necessário no login.
        // const qrCodeData = await gerarQrCodePix(cobrancaCriada.loc.id);
        // Você pode ter outra rota/lógica para o usuário buscar o QR code da cobrança pendente.

      }

    } catch (error) {
      console.error(`Erro ao verificar/criar anuidade para usuário ${userId}:`, error.response?.data || error.message || error);
      // Decida como tratar o erro: apenas logar ou lançar para o controller de login saber?
      // Lançar o erro pode impedir o login se essa verificação for crítica.
      // throw error;
    }
  }
}