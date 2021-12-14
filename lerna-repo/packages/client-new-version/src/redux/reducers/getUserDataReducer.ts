import { IUserData } from '../../types/types';

export const getUserDataReducer = (
    state: IUserData,
    action: { type: string; payload: IUserData },
) => {
    try {
        switch (action.type) {
            case 'GET_USER_DATA':
                return action.payload;
            default:
                return state;
        }
    } catch (error) {
        console.log(error);
    }
};
