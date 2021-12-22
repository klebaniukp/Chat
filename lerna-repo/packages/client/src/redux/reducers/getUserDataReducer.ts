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
            case 'SET_USER_DATA':
                return action.payload;
            default:
                return {
                    id: 'x',
                    email: 'John@Doe.com',
                    name: 'John',
                    lastName: 'Doe',
                    friends: [
                        {
                            id: '1039274',
                        },
                    ],
                };
        }
    } catch (error) {
        console.log(error);
    }
};
