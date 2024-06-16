const Modalidade = require('../models/modalidade');

module.exports = class ModalidadeController {
    // criar uma nova modalidade
    static async cadastrarModalidade(req, res) {
        try {
            const { NM_MODALIDADE, NOMENCLATURA } = req.body;

            // validações
            if (!NM_MODALIDADE) {
                return res.status(422).json({ message: 'O nome da modalidade é obrigatório!' });
            }

            // verificação se a modalidade já existe
            const modalidadeExistente = await Modalidade.findOne({ where: { NM_MODALIDADE } });
            if (modalidadeExistente) {
                return res.status(422).json({ message: 'A modalidade já está cadastrada!' });
            }

            // criando a nova modalidade
            const novaModalidade = await Modalidade.create({ NM_MODALIDADE, NOMENCLATURA });

            return res.status(201).json({ message: 'Modalidade cadastrada com sucesso!'});
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar a modalidade', error: error.message });
        }
    }

    // editar uma modalidade existente
    static async editarModalidade(req, res) {
        try {
            const { CD_MODALIDADE } = req.params;
            const { NM_MODALIDADE, NOMENCLATURA } = req.body;

            // validações
            if (!NM_MODALIDADE) {
                return res.status(422).json({ message: 'O nome da modalidade é obrigatório!' });
            }

            // encontrando a modalidade existente
            const modalidade = await Modalidade.findByPk(CD_MODALIDADE);
            if (!modalidade) {
                return res.status(404).json({ message: 'Modalidade não encontrada' });
            }

            // atualizando a modalidade
            modalidade.NM_MODALIDADE = NM_MODALIDADE;
            modalidade.NOMENCLATURA = NOMENCLATURA;

            await modalidade.save();

            return res.status(200).json({ message: 'Modalidade atualizada com sucesso!'});
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao atualizar a modalidade', error: error.message });
        }
    }

    // listar todas as modalidades
    static async listarModalidades(req, res) {
        try {
            const modalidades = await Modalidade.findAll();

            if (modalidades.length === 0) {
                return res.status(404).json({ mensagem: 'Não há nenhuma modalidade cadastrada' });
            }

            const modalidadesFormatada = modalidades.map(modalidade => ({
                CD_MODALIDADE: modalidade.CD_MODALIDADE,
                NM_MODALIDADE: modalidade.NM_MODALIDADE
            }));

            return res.status(200).json({modalidades: modalidadesFormatada});
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao obter as modalidades', error: error.message });
        }
    }

    // obter uma modalidade específica
    static async obterModalidade(req, res) {
        const { CD_MODALIDADE } = req.params;
    
        try {
            const modalidade = await Modalidade.findOne({ where: { CD_MODALIDADE: CD_MODALIDADE } });
    
            if (!modalidade) {
                return res.status(404).json({ mensagem: 'Modalidade não encontrada' });
            }
    
            const modalidadeFormatada = {
                CD_MODALIDADE: modalidade.CD_MODALIDADE,
                NM_MODALIDADE: modalidade.NM_MODALIDADE,
                NOMENCLATURA: modalidade.NOMENCLATURA
            };
    
            res.status(200).json({ modalidade: modalidadeFormatada });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao obter a modalidade', error: error.message });
        }
    }

    // deletar uma modalidade
    static async deletarModalidade(req, res) {
        try {
            const { CD_MODALIDADE } = req.params;

            // encontrando a modalidade existente
            const modalidade = await Modalidade.findByPk(CD_MODALIDADE);
            if (!modalidade) {
                return res.status(404).json({ message: 'Modalidade não encontrada' });
            }

            // deletando a modalidade
            await modalidade.destroy();

            return res.status(200).json({ message: 'Modalidade deletada com sucesso!' });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao deletar a modalidade', error: error.message });
        }
    }
};
