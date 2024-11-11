import axios from 'axios';

const token = localStorage.getItem('token');

const api = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    headers: {
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export const fetchBooks = async () => {
    const response = await api.get('/livros');
    return response.data;
};

export const rentBook = async (bookId) => {
    const response = await api.post(`/livros/${bookId}/alugar`);
    return response.data;
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export default api;


