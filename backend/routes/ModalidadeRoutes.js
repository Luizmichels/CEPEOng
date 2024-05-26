const express = require('express');
const router = express.Router();
const ModalidadeController = require('../controller/ModalidadeController');
const ChecarToken = require('../helpers/VerificarToken')

// rota para criar uma nova modalidade
router.post('/cadastro', ChecarToken, ModalidadeController.cadastrarModalidade);

// rota para editar uma modalidade existente
router.patch('/editar/:CD_MODALIDADE', ChecarToken, ModalidadeController.editarModalidade);

// rota para listar todas as modalidades
router.get('/listar/', ChecarToken, ModalidadeController.listarModalidades);

// rota para obter uma modalidade específica
router.get('/obter/:CD_MODALIDADE', ChecarToken, ModalidadeController.obterModalidade);

// rota para deletar uma modalidade
router.delete('/deletar/:CD_MODALIDADE', ChecarToken, ModalidadeController.deletarModalidade);

module.exports = router;    
