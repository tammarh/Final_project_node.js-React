// src/services/userService.js
import api from './api';

export const getAllUsers = async () => {
    const response = await api.get('/User');
    return response.data;
};

export const getUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await api.post('/User', user);
    return response.data
     
};

export const updateUser = async (user) => {
    const response = await api.put('/User', user);
    console.log(response.data);
    
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await api.delete(`/User/${id}`);
    return response.data;
};
