import { IUserData } from '../../types/types';

interface IState {
    data: IUserData | null | undefined;
}

export const getUserDataReducer = (
    state: IState,
    action: { type: string; payload: IUserData },
) => {
    try {
        switch (action.type) {
            case 'GET_USER_DATA':
                return action.payload;
            default:
                return {
                    id: '',
                    email: '',
                    name: '',
                    lastName: '',
                    friends: [
                        {
                            id: '',
                            email: '',
                            name: '',
                            lastName: '',
                        },
                    ],
                };
        }
    } catch (error) {
        console.log(error);
    }
};
