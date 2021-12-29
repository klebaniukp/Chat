import { IUserData } from '../../types/types';

// interface IState {
//     data: IUserData | null | undefined;
// }

export const getUserDataReducer = (
    state: IUserData,
    action: { type: string; payload: IUserData },
) => {
    try {
        switch (action.type) {
            case 'SET_USER_DATA':
                // return {

                //     id: action.payload.id,
                //     email: action.payload.email,
                //     name: action.payload.name,
                //     lastName: action.payload.lastName,
                //     friends: action.payload.friends,
                // };r
                return action.payload;
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
