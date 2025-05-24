import api from './api'


export const login = async (userName, password) => {
    const response = await api.post('/auth/login', { username: userName, password })
    return response.data
}

export const register = async (user) => {
    const response = await api.post('/auth/register', user);
    return response.data;
};