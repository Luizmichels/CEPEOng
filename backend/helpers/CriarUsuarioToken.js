const jwt = require('jsonwebtoken')

const CriarUsuarioToken = async (usuario, req, res) => {

    //Criando Token
    const token = jwt.sign({
        id: usuario.CD_USUARIO,
    }, "nossosecret")
    // , { expiresIn: 10 })

    // Retornando Token
    res.status(200).json({
        message: 'Você está autenticado!', 
        token: token,
        usuarioId: usuario.CD_USUARIO
    })
}

module.exports = CriarUsuarioToken