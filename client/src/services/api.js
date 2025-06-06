import axios from 'axios'
import {store} from '../redux/store' 
const api = axios.create({
    
    baseURL: 'http://localhost:9999/api', 
    headers: {
        'Content-Type': 'application/json',
    }
})
api.interceptors.request.use((config) => {
    const state = store.getState();
    const {token} = state.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;
