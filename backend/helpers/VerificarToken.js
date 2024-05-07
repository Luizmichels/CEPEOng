const jwt = require('jsonwebtoken');
const ObterToken = require('./ObterToken')

const ChecarToken = (req, res, next) => {
    const token = ObterToken(req);
    if (!token) {
        return res.status(401).json({ message: 'Token de autorização ausente' });
    }
    try {
        const verificado = jwt.verify(token, 'nossosecret');
        req.Usuario = verificado;
        next();
    } catch (err) {
        return res.status(400).json({ message: 'Token inválido!' });
    }
}

module.exports = ChecarToken;