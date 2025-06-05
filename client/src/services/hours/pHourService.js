import api from '../api'

export const getAllpHours = async () => {
    const {data} = await api.get('/PersonalBasketHours')
    return data
}

export const createPersonalBasketHours = async (phour) => {
    const {data} = await api.post('/PersonalBasketHours', phour)
    return data
}

export const updatePersonalBasketHours = async (phour) => {
    const {data} = await api.put('/PersonalBasketHours', phour)
    return data
}

export const deletePersonalBasketHours = async (id) => {
    const {data} = await api.delete(`/PersonalBasketHours/${id}`)
    return data
}
