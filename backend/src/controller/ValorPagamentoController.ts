// ../controllers/ValorPagamentoController.js
import ValorPagamento from "../models/ValorPagamento.js";

export default class ValorPagamentoController {

  static async inicializarValor(req, res) {
    try {
      const valorExistente = await ValorPagamento.findOne();
      if (!valorExistente) {
        const novoValor = await ValorPagamento.create({ VALOR: 60.00 });
        return res.status(201).json({ message: "Valor inicial da anuidade criado com sucesso!", novoValor });
      } else {
        return res.status(200).json({ message: "Valor da anuidade já inicializado.", valorExistente });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listarValorUnico(req, res) {
    try {
      const valorUnico = await ValorPagamento.findOne();
      if (!valorUnico) {
        return res.status(404).json({ message: 'Nenhum valor de anuidade cadastrado.' });
      }
      res.status(200).json({ VALOR: valorUnico.VALOR, CD_VALOR_PAGAMENTO: valorUnico.CD_VALOR_PAGAMENTO });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async atualizarValorUnico(req, res) {
    const { VALOR } = req.body;

    try {
      if (!VALOR) {
        return res.status(422).json({ message: 'O Valor é obrigatório!' });
      }

      const [updatedRows] = await ValorPagamento.update({ VALOR }, { where: {} });

      if (updatedRows > 0) {
        const valorAtualizado = await ValorPagamento.findOne();
        res.status(200).json({ message: 'Valor da anuidade atualizado com sucesso!', valorAtualizado });
      } else {
        res.status(404).json({ message: 'Nenhum valor de anuidade encontrado para atualizar.' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}