const Funcao = require('../models/funcao');

module.exports = class FuncaoController {
    // Função para cadastrar uma nova função (esportista ou associado)
    static async cadastrarFuncao(req, res) {
        try {
            const { NM_FUNCAO, DESCRICAO } = req.body;

            // Validações
            if (!NM_FUNCAO) {
                res.status(422).json({ message: 'O nome da função é obrigatório!' });
                return;
            }

            // Verificação se a função já existe
            const funcaoExistente = await Funcao.findOne({ where: { NM_FUNCAO } });
            if (funcaoExistente) {
                res.status(422).json({ message: 'A função já está cadastrada!' });
                return;
            }

            // Criando a nova função
            const novaFuncao = await Funcao.create({ NM_FUNCAO, DESCRICAO });

            res.status(201).json({ message: 'Função cadastrada com sucesso!', novaFuncao });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar a função', error: error.message });
        }
    }
};
