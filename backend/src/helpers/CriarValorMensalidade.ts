import ValorPagamento from "../models/ValorPagamento.js";

async function inicializarValorteste() {
  try {
    const valorExistente = await ValorPagamento.findOne();
    if (!valorExistente) {
      const novoValor = await ValorPagamento.create({ VALOR: 60.00 });
      console.log("Valor inicial da anuidade criado com sucesso!", novoValor);
    } else {
      console.log("Valor da anuidade já inicializado.", valorExistente);
    }
  } catch (error) {
    console.error("Erro ao inicializar valor da anuidade:", error.message);
  }
}

export default inicializarValorteste;
