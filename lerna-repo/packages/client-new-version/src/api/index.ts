import axios from 'axios';
const url = 'http://localhost:3000/';

const API = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const signIn = (formData: Object) => API.post('/user/signin', formData);
export const signUp = (formData: Object) => API.post('/user/signup', formData);
export const getUserData = () => API.get('/user/data');

export {};
