import { IUserData } from '../../types/types';

export const getUserData =
    (userData: IUserData) =>
    (dispatch: (arg0: { type: string; payload: IUserData }) => void) => {
        try {
            dispatch({
                type: 'GET_USER_DATA',
                payload: userData,
            });
        } catch (error) {
            console.log(error);
        }
    };

