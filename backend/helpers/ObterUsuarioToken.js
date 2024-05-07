const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const ObterUsuarioToken = async (token) => {
    if (!token) {
        throw new Error('Acesso Negado!');
    }

    const decoded = jwt.verify(token, "nossosecret");

    const usuarioId = decoded.id;

    const usuario = await Usuario.findOne({ _id: usuarioId });

    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    return usuario;
};

module.exports = ObterUsuarioToken;