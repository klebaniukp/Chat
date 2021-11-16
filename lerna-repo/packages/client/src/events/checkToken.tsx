import { tokenCheck } from '../api/index';
import jwt from 'jsonwebtoken';

export const checkToken = () => {
    try {
        tokenCheck().then(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            },
        );
    } catch (error) {
        console.log(error);
    }
};
