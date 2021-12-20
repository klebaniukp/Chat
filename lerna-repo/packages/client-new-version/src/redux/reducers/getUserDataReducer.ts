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
                            id: 'y',
                            email: 'guest@example.com',
                            name: 'guest',
                            lastName: 'lastname-example',
                        },
                    ],
                };
        }
    } catch (error) {
        console.log(error);
    }
};
