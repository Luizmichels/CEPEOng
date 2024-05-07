const ObterToken = (req) => {
    // Verifica se o cabeçalho de autorização está presente
    if (!req.headers.authorization) {
        throw new Error('Cabeçalho de autorização ausente');
    }

    // Divide o cabeçalho de autorização para extrair o token
    const authHeader = req.headers.authorization;
    const parts = authHeader.split(' ');

    // Verifica se o token está presente e no formato esperado
    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1]) {
        throw new Error('Formato de token inválido');
    }

    // Retorna o token
    return parts[1];
}

module.exports = ObterToken;