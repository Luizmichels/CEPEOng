const Usuario = require('../models/usuario')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers 
const CriarUsuarioToken = require('../helpers/CriarUsuarioToken')
const ObterToken = require('../helpers/ObterToken')
const ObterUsuarioToken = require('../helpers/ObterUsuarioToken')


// 500 -> servidor
// 201 -> deu bom
// 422 -> faltando infos

module.exports = class UsuarioController {

    // Criando o usuário
    static async CadastroUsuario(req, res) {

        const {NM_USUARIO, SENHA, CONFIRMASENHA} = req.body

           // Validações
           if (!NM_USUARIO) {
            res.status(422).json({ message: 'O nome é obrigatório' });
            return;
        }

        if (!SENHA) {
            res.status(422).json({ message: 'A senha é obrigatória' });
            return;
        }

        if (!CONFIRMASENHA) {
            res.status(422).json({ message: 'Confirmar a senha é obrigatório' });
            return;
        }

        // Verificação se a senha e a confirmação de senha são iguais
        if (SENHA !== CONFIRMASENHA) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' });
            return;
        }


        // Verificação se o usuario já existe
        const usuarioExiste = await Usuario.findOne({ where: { NM_USUARIO: NM_USUARIO } });
        if (usuarioExiste) {
            return res.status(422).json({ message: 'Nome de usuário já está em uso' });
        }


        try {
            // Criando a senha e criptografando a senha
            const salt = await bcrypt.genSalt(12);
            const senhaHash = await bcrypt.hash(SENHA, salt);

            // Criando usuário
            const usuario = new Usuario({
                NM_USUARIO,
                SENHA: senhaHash,
                CONFIRMASENHA: senhaHash,
            });

            const novoUsuario = await usuario.save();
            await CriarUsuarioToken(novoUsuario, req, res);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao cadastrar o Usuário', error: error.message });
        }

    }



    static async login(req, res) {
        
        const { NM_USUARIO, SENHA } = req.body
    
        // Validação
        if (!NM_USUARIO) {
            res.status(422).json({ message: 'O nome de usuário é obrigatório' })
            return
        }
    
        if (!SENHA) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }
    
        // Verificação se o usuario já existe
        const usuario = await Usuario.findOne({ NM_USUARIO: NM_USUARIO })
        if (!usuario) {
            res.status(422).json({ message: 'Não há usuário cadastrado com este Nome!'})
            return
        }
    
        // Verificando se a senha enviada está batendo com a senha do banco de dados
        const checarSenha = await bcrypt.compare(SENHA, usuario.SENHA);
    
        if (!checarSenha) {
            res.status(422).json({ message: 'Senha inválida!' });
            return;
        }
    
        await CriarUsuarioToken(usuario, req, res);
    
    }

}