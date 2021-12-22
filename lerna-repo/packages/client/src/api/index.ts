import axios from 'axios';
const url = 'http://localhost:8000/';

const API = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const signIn = (formData: { email: string; password: string }) =>
    API.post('/user/signin', formData);

export const signUp = (formData: {
    email: string;
    name: string;
    lastName: string;
    password: string;
}) => API.post('/user/signup', formData);

export const getUserData = () => API.get('/user/getUser');

export const updateUserData = (formData: {
    name: string;
    email: string;
    lastname: string;
}) => API.post('/user/updateUser', formData);

export const searchUsers = (formData: { searchPhraze: string }) =>
    API.post('/user/searchUser', formData);
