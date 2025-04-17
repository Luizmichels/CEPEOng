// ../controllers/FuncaoController.js
import ValorPagamento from "../models/ValorPagamento";

export default class ValorPagamentoController {

  static async cadastrarValor(req, res) {
    try {
      const {VALOR} = req.body;

      if (!VALOR) return res.status(422).json({ message: "O valor é obrigatório!" })

      const novaValor = await ValorPagamento.create({ VALOR });
      res.status(201).json({ message: "Novo Valor Cadastrado com sucesso!", novaValor });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listarUltValor(req, res) {
    try {
        const ultValor = await ValorPagamento.findOne({
          order: [['createdAt', 'DESC']]
        });

        if (ultValor.length === 0) {
            return res.status(404).json({ message: 'Não há nenhum valor cadastrado' });
        }

        res.status(200).json({  CD_VALOR_PAGAMENTO: ultValor.CD_VALOR_PAGAMENTO,
                                VALOR: ultValor.VALOR });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  // Obter uma função específica por ID
  static async obterValor(req, res) {
    const { CD_VALOR_PAGAMENTO } = req.params;

    try {
        const Valor = await ValorPagamento.findOne({ where: { CD_VALOR_PAGAMENTO } });

        if (!Valor) return res.status(404).json({ message: 'Valor não encontrado' });

        const ValorFormatada = {
          CD_VALOR_PAGAMENTO: Valor.CD_VALOR_PAGAMENTO,
          VALOR: Valor.VALOR
        };

        res.status(200).json({ Valor: ValorFormatada });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  static async atualizarValor(req, res) {
    const { CD_VALOR_PAGAMENTO } = req.params;
    const { VALOR } = req.body;

    try {
        if (!VALOR) return res.status(422).json({ message: 'O Valor é obrigatório!' });

        const valor = await ValorPagamento.findOne({ where: { CD_VALOR_PAGAMENTO } });

        if (!valor) {
            return res.status(404).json({ message: 'Função não encontrada!' });
        }

        await ValorPagamento.update({ VALOR });

        res.status(200).json({ message: 'Valor atualizado com sucesso!', valor });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
  }

  static async deletarValor(req, res) {
    const { CD_VALOR_PAGAMENTO } = req.params;

    try {
        const valor = await ValorPagamento.findOne({ where: { CD_VALOR_PAGAMENTO } });

        if (!valor) return res.status(404).json({ message: 'Valor não encontrada' });

        await ValorPagamento.destroy({ where: { CD_VALOR_PAGAMENTO } });

        res.status(200).json({ message: 'Valor deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

}
