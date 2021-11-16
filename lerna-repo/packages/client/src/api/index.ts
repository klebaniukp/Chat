import axios from 'axios';
// import { hostUrl } from '../constants/url';
const hostUrl = 'http://localhost:8000';

const API = axios.create({
    baseURL: hostUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const signIn = (formData: Object) => API.post('/user/signin', formData);
export const signUp = (formData: Object) => API.post('/user/signup', formData);
export const tokenCheck = () => API.post('/user/session');
