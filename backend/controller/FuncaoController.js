const Funcao = require('../models/funcao');

// criar uma nova função
exports.cadastrarFuncao = async (req, res) => {
    try {
        const { NM_FUNCAO, DS_FUNCAO } = req.body;
        const novaFuncao = await Funcao.create({ NM_FUNCAO, DS_FUNCAO });
        res.status(201).json(novaFuncao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// listar todas as funções
exports.listarFuncoes = async (req, res) => {
    try {
        const funcoes = await Funcao.findAll();
        res.status(200).json(funcoes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// obter uma função específica por ID
exports.obterFuncao = async (req, res) => {
    try {
        const { id } = req.params;
        const funcao = await Funcao.findByPk(id);
        if (funcao) {
            res.status(200).json(funcao);
        } else {
            res.status(404).json({ error: 'Função não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// atualizar uma função por ID
exports.atualizarFuncao = async (req, res) => {
    try {
        const { id } = req.params;
        const { NM_FUNCAO, DS_FUNCAO } = req.body;
        const [updated] = await Funcao.update({ NM_FUNCAO, DS_FUNCAO }, {
            where: { CD_FUNCAO: id }
        });
        if (updated) {
            const updatedFuncao = await Funcao.findByPk(id);
            res.status(200).json(updatedFuncao);
        } else {
            res.status(404).json({ error: 'Função não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// deletar uma função por ID
exports.deletarFuncao = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Funcao.destroy({
            where: { CD_FUNCAO: id }
        });
        if (deleted) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Função não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
