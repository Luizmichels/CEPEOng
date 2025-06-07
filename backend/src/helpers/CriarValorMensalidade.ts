import ValorPagamento from "../models/ValorPagamento.js";

async function inicializarValor() {
  try {
    const valorExistente = await ValorPagamento.findOne();
    if (!valorExistente) {
      const novoValor = await ValorPagamento.create({ VALOR: 60.00 });
      console.log("Valor inicial da anuidade criado com sucesso!");
    } else {
      console.log("Valor da anuidade já inicializado.");
    }
  } catch (error) {
    console.error("Erro ao inicializar valor da anuidade:", error.message);
  }
}

export default inicializarValor;
