import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

const ObterUsuarioToken = async (token) => {
    if (!token) {
        throw new Error('Acesso Negado!');
    }

    const decoded = jwt.verify(token, "nossosecret");

    const usuarioId = decoded.id;

    const usuario = await Usuario.findOne({ where: { CD_USUARIO: usuarioId } });

    if (!usuario) {
        throw new Error('Usuário não encontrado!');
    }

    return usuario;
};

export default ObterUsuarioToken;