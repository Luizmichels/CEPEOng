const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// helpers
const CriarUsuarioToken = require('../helpers/CriarUsuarioToken');
const ObterToken = require('../helpers/ObterToken');
const ObterUsuarioToken = require('../helpers/ObterUsuarioToken');

module.exports = class UsuarioController {

    // Função para cadastrar o usuário
    static async CadastroUsuario(req, res) {
        const { NM_USUARIO, SENHA, CONFIRMASENHA } = req.body;

        // Validações
        if (!NM_USUARIO) {
            return res.status(422).json({ message: 'O nome é obrigatório' });
        }

        if (!SENHA) {
            return res.status(422).json({ message: 'A senha é obrigatória' });
        }

        if (!CONFIRMASENHA) {
            return res.status(422).json({ message: 'Confirmar a senha é obrigatório' });
        }

        // Verificação se a senha e a confirmação de senha são iguais
        if (SENHA !== CONFIRMASENHA) {
            return res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' });
        }

        try {
            // Verificação se o usuario já existe
            const usuarioExiste = await Usuario.findOne({ where: { NM_USUARIO: NM_USUARIO } });
            if (usuarioExiste) {
                return res.status(422).json({ message: 'Nome de usuário já está em uso' });
            }

            // Criando a senha e criptografando a senha
            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(SENHA, salt);

            // Criando usuário
            const usuario = new Usuario({
                NM_USUARIO,
                SENHA: senhaHash,
            });

            const novoUsuario = await usuario.save();
            return res.status(201).json({ message: 'Usuário cadastrado com sucesso', usuario: novoUsuario });
        } catch (error) {
            return res.status(500).json({ message: 'Erro ao cadastrar o Usuário', error: error.message });
        }
    }

    // Função de login
    static async login(req, res) {
        const { NM_USUARIO, SENHA } = req.body;

        // Validação
        if (!NM_USUARIO) {
            console.log('Nome de usuário não fornecido');
            return res.status(422).json({ message: 'O nome de usuário é obrigatório' });
        }

        if (!SENHA) {
            console.log('Senha não fornecida');
            return res.status(422).json({ message: 'A senha é obrigatória' });
        }

        try {
            // Verificação se o usuario já existe
            const usuario = await Usuario.findOne({ where: { NM_USUARIO: NM_USUARIO } });
            if (!usuario) {
                console.log('Usuário não encontrado:', NM_USUARIO);
                return res.status(422).json({ message: 'Não há usuário cadastrado com este Nome!' });
            }

            // Verificando se a senha enviada está batendo com a senha do banco de dados
            const checarSenha = await bcrypt.compare(SENHA, usuario.SENHA);

            if (!checarSenha) {
                console.log('Senha inválida para o usuário:', NM_USUARIO);
                return res.status(422).json({ message: 'Senha inválida!' });
            }

            console.log('Usuário autenticado com sucesso:', NM_USUARIO);
            await CriarUsuarioToken(usuario, req, res);
        } catch (error) {
            console.error('Erro no processo de login:', error);
            return res.status(500).json({ message: 'Erro no servidor. Tente novamente mais tarde.' });
        }
    }

        // Função para deletar o Usuario
        static async DeletarUsuario(req, res) {
            const { CD_USUARIO } = req.params;
        
            try {
                // Verificação se o meio de locomoção existe
                const usuarioExiste = await Usuario.findOne({ where: { CD_USUARIO: CD_USUARIO } });
                if (!usuarioExiste) {
                    return res.status(404).json({ message: 'Usuário não encontrado' });
                }
        
                // Deletando meio de locomoção
                await Usuario.destroy({ where: { CD_USUARIO: CD_USUARIO } });
        
                return res.status(200).json({ message: 'Usuário deletado com sucesso' });
            } catch (error) {
                return res.status(500).json({ message: 'Erro ao deletar o Usuário', error: error.message });
            }
        } 
}