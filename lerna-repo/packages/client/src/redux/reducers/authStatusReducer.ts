import { IUserData } from '../../types/types';

export const authStatusReducer = (
    state: boolean,
    action: { type: string; payload: boolean },
) => {
    try {
        switch (action.type) {
            case 'SET_IS_LOGGED_IN':
                return action.payload;
            default:
                if (state) {
                    return state;
                } else {
                    return false;
                }
        }
    } catch (error) {
        console.log(error);
    }
};
