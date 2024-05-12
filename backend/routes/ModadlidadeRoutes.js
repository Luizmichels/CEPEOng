const express = require('express');
const router = express.Router();
const Modalidade = require('../models/modalidade');

// Rota para criar uma nova modalidade
router.post('/cadastro', async (req, res) => {
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
});

module.exports = router;
