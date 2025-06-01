import api from '../api'

export const getAlltHours = async () => {
    const {data} = await api.get('/TeachingHours')
    return data
}

export const createTeachingHour = async (thour) => {
    const {data} = await api.post('/TeachingHours', thour)
    return data
}

export const updateTeachingHour = async (thour) => {
    const {data} = await api.put('/TeachingHours', thour)
    return data
}

export const deleteTeachingHour = async (id) => {
    const {data} = await api.delete(`/TeachingHours/${id}`)
    return data
}
