import axios from 'axios';
import { hostUrl } from '../constants/url';

const API = axios.create({
    baseURL: hostUrl,
    withCredentials: true,
});

export const signIn = (formData: FormData) =>
    API.post('/user/signin', formData);
export const signUp = (formData: FormData) =>
    API.post('/user/signup', formData);
