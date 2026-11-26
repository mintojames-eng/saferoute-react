import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// REST API Service Methods (Step 11: Axios Client)
export const getItems = (params) => api.get('/api/items', { params });
export const getItemById = (id) => api.get(`/api/items/${id}`);
export const createItem = (data) => api.post('/api/items', data);
export const updateItem = (id, data) => api.put(`/api/items/${id}`, data);
export const deleteItem = (id) => api.delete(`/api/items/${id}`);
export const getBangaloreAreas = (params) => api.get('/bangalore-areas', { params });
export const getAlerts = () => api.get('/alerts');
export const getStatus = () => api.get('/status');

export default api;
