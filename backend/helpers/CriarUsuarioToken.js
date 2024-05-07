const jwt = require('jsonwebtoken')

const CriarUsuarioToken = async (usuario, req, res) => {

    //Criando Token
    const token = jwt.sign({
        id: usuario._id
    }, "nossosecret")

    // Retornando Token
    res.status(200).json({
        message: 'Você está autenticado!', 
        token: token,
        usuarioId: usuario._id
    })
}

module.exports = CriarUsuarioToken