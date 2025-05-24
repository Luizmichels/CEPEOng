const ObterToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1];
    return token;
};

export default ObterToken;
