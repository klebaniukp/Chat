import { IUserData } from '../../types/types';

export const setUserDataReducer = (
    state: IUserData,
    action: { type: string; payload: IUserData },
) => {
    try {
        switch (action.type) {
            case 'SET_USER_DATA':
                return action.payload;
            case 'LOGOUT':
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
            default:
                if (state) {
                    return state;
                } else {
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
        }
    } catch (error) {
        console.log(error);
    }
};
