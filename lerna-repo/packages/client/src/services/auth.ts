import { getUserData } from '../api/index';
import { useDispatch } from 'react-redux';
import { IUserData } from '../types/types';

export const auth = (i: number) => {
    if (i !== 0) return 1;
    try {
        const dispatch = useDispatch();

        getUserData()
            .then((res: any) => {
                const userData: IUserData = {
                    id: res.data._id,
                    email: res.data.email,
                    name: res.data.name,
                    lastName: res.data.lastName,
                    friends: res.data.friends,
                };

                dispatch({ type: 'SET_USER_DATA', payload: userData });
            })
            .catch((err: string | undefined) => {
                console.log(err);
            });
    } catch (err) {
        console.log(err);
    }
};
