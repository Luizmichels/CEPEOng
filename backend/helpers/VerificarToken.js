const jwt = require('jsonwebtoken')
const ObterToken = require('../helpers/ObterToken')
const Usuario = require('../models/usuario')

const ChecarToken = (req, res, next) => {
    const token = ObterToken(req)
    if (!token) {
        return res.status(401).json({ message: 'Token de autorização ausente' })
    }
    try {
        const verificado = jwt.verify(token, 'nossosecret')
        req.usuario = verificado
        next()
    } catch (err) {
        return res.status(400).json({ message: 'Token inválido!' })
    }
}

const verificarNivelAcesso = (nivelRequerido) => {
    return async (req, res, next) => {
        const token = ObterToken(req)
        if (!token) {
            return res.status(401).json({ message: 'Token de autorização ausente' })
        }
        try {
            const decoded = jwt.verify(token, 'nossosecret')
            const usuario = await Usuario.findOne({ where: { CD_USUARIO: decoded.id } })
            if (usuario.NIVEL_ACESSO >= nivelRequerido) {
                req.usuario = usuario
                next()
            } else {
                return res.status(403).json({ message: 'Acesso negado!' })
            }
        } catch (err) {
            return res.status(400).json({ message: 'Token inválido!' })
        }
    }
}

module.exports = {
    ChecarToken,
    verificarNivelAcesso
}