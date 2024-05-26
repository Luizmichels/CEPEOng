const express = require('express');
const router = express.Router();
const FuncaoController = require('../controller/funcaoController');
const ChecarToken = require('../helpers/VerificarToken')

//  criar uma nova função
router.post('/cadastro', ChecarToken, FuncaoController.cadastrarFuncao);

//  listar todas as funções
router.get('/listar', ChecarToken, FuncaoController.listarFuncoes);

//  obter uma função específica por ID
router.get('/obter/:id', ChecarToken, FuncaoController.obterFuncao);

//  atualizar uma função por ID
router.put('/atualizar/:id', ChecarToken, FuncaoController.atualizarFuncao);

//  deletar uma função por ID
router.delete('/deletar/:id', ChecarToken, FuncaoController.deletarFuncao);

module.exports = router;
