const express = require('express');
const router = express.Router();
const FuncaoController = require('../controllers/funcaoController');

// Rota para criar uma nova função
router.post('/cadastro', FuncaoController.cadastrarFuncao);

module.exports = router;
