const Modalidade = require('../models/Modalidade');

module.exports = class ModalidadeController {
    // Função para cadastrar uma nova modalidade
    static async cadastrarModalidade(req, res) {
        try {
            const { NM_MODALIDADE, NOMENCLATURA } = req.body;

            // Validações
            if (!NM_MODALIDADE) {
                res.status(422).json({ message: 'O nome da modalidade é obrigatório!' });
                return;
            }

            // Verificação se a modalidade já existe
            const modalidadeExistente = await Modalidade.findOne({ where: { NM_MODALIDADE } });
            if (modalidadeExistente) {
                res.status(422).json({ message: 'A modalidade já está cadastrada!' });
                return;
            }

            // Criando a nova modalidade
            const novaModalidade = await Modalidade.create({ NM_MODALIDADE, NOMENCLATURA });

            res.status(201).json({ message: 'Modalidade cadastrada com sucesso!', novaModalidade });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar a modalidade', error: error.message });
        }
    }

    // Função para editar uma modalidade existente
    static async editarModalidade(req, res) {
        try {
            const { CD_MODALIDADE } = req.params;
            const { NM_MODALIDADE, NOMENCLATURA } = req.body;

            // Validações
            if (!NM_MODALIDADE) {
                res.status(422).json({ message: 'O nome da modalidade é obrigatório!' });
                return;
            }

            // Encontrando a modalidade existente
            const modalidade = await Modalidade.findByPk(CD_MODALIDADE);
            if (!modalidade) {
                res.status(404).json({ message: 'Modalidade não encontrada' });
                return;
            }

            // Atualizando a modalidade
            modalidade.NM_MODALIDADE = NM_MODALIDADE;
            modalidade.NOMENCLATURA = NOMENCLATURA;

            await modalidade.save();

            res.status(200).json({ message: 'Modalidade atualizada com sucesso!', modalidade });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar a modalidade', error: error.message });
        }
    }
};
