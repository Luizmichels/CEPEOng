const Usuario = require('../models/usuario')

module.exports = class UsuarioController {

    // Criando o usuário
    static async CadastroUsuario(req, res) {

        //Criando constante
        const {NM_USUARIO, SENHA} = req.body

        //Validação
        if (!NM_USUARIO){
            res.status(422).json({ mensagem: 'O Usuário é obrigatório!'})
            return
        }

        if (!SENHA){
            res.status(422).json({ mensagem: 'A Senha é obrigatório!'})
            return
        }
        
        try {
            // Inserindo o usuario no banco
            await Usuario.create({
                NM_USUARIO: NM_USUARIO,
                SENHA: SENHA
            })

            res.status(201).json({ mensagem:'Usuário cadastrado com sucesso!'})
        } catch (error) {
            res.status(500).json({ mensagem:'Erro ao cadastrar o Usuário', erro:error.message})
        }
    }
}

// 500 -> servidor
// 201 -> deu bom
// 422 -> faltando infos