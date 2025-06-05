import api from './api'

export const getAllInstitutions = async () => {
    const response = await api.get('/Institution');
    return response.data;
};