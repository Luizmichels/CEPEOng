// src/helpers/obterUltimoValorHelper.js
import ValorPagamento from "../models/ValorPagamento";

async function ObterUltimoValor() {
  try {
    const ultValor = await ValorPagamento.findOne({
      order: [['createdAt', 'DESC']]
    });

    if (!ultValor) {
      return null; // Retorna null se não houver valor cadastrado
    }

    return ultValor.VALOR; // Retorna apenas o valor
  } catch (error) {
    console.error("Erro ao obter último valor:", error);
    throw error; // Rejeita o erro para que o chamador possa lidar com ele
  }
}

export default ObterUltimoValor;