import api from '../api'

export const getAlliHours = async () => {
    const {data} = await api.get('/IntegrationHour')
    return data
}

export const createIntegrationHour = async (ihour) => {
    const {data} = await api.post('/IntegrationHour', ihour)
    return data
}

export const updateIntegrationHour = async (ihour) => {
    const {data} = await api.put('/IntegrationHour', ihour)
    return data
}

export const deleteIntegrationHour = async (id) => {
    const {data} = await api.delete(`/IntegrationHour/${id}`)
    return data
}
