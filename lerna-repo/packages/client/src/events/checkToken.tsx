import { authorize } from '../api/index';

export const checkToken = () => {
    try {
        const responseTest = authorize().then(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            },
        );

        console.log(responseTest);
    } catch (error) {
        console.log(error);
    }
};
