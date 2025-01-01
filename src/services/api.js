import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.example.com',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token'); // O de un estado en memoria
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
