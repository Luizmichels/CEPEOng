
export function setToken(token) {
    localStorage.setItem('user_token', token)
}

export function getToken(token) {
    try {
        return localStorage.getItem('user_token');
    } catch (error) {
        return false;
    }
}