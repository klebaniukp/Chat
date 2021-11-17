import { tokenCheck } from '../api/index';

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
