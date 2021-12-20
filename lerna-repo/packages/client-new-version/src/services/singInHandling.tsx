import { signIn, getUserData } from '../api/index';
import { useDispatch } from 'react-redux';

export const signInHandling = async (email: string, password: string) => {
    const dispatch = useDispatch();

    try {
        signIn({ email: email, password: password })
            .then(res => {
                if (res.status === 200) {
                    getUserData().then(res => {
                        if (res.status === 200) {
                            dispatch({
                                type: 'SET_USER_DATA',
                                payload: res.data,
                            });
                        }
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }
};
