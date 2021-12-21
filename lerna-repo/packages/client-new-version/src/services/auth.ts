import { getUserData } from '../api/index';
import { useDispatch } from 'react-redux';
import { IUserData } from '../types/types';

export const auth = () => {
    const dispatch = useDispatch();

    getUserData()
        .then((res: any) => {
            const userData: IUserData = {
                id: res.data.id,
                email: res.data.email,
                name: res.data.name,
                lastName: res.data.lastName,
                friends: res.data.friends,
            };

            dispatch({ type: 'SET_USER_DATA', payload: userData });

            console.log(res.data);
        })
        .catch((err: string | undefined) => {
            console.log(err);
            throw new Error(err);
        });
};
