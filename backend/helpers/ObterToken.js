const ObterToken = (req) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('Token Ausente ou Inválido');
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        throw new Error('Formato de token inválido');
    }

    return parts[1];
};

module.exports = ObterToken