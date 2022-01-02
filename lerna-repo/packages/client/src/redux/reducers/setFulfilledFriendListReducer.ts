import { IFullFriendData } from '../../types/types';

export const setFulfilledFriendListReducer = (
    state: IFullFriendData[],
    action: { type: string; payload: IFullFriendData[] },
) => {
    try {
        switch (action.type) {
            case 'SET_FULFILLED_FRIENDLIST':
                return action.payload;
            case 'CLEAR_FULFILLED_FRIENDLIST':
                return [
                    {
                        email: 'John@Doe.com',
                        name: 'John',
                        lastName: 'Doe',
                    },
                ];
            default:
                if (state) {
                    return state;
                } else {
                    return [
                        {
                            email: 'John@Doe.com',
                            name: 'John',
                            lastName: 'Doe',
                        },
                    ];
                }
        }
    } catch (error) {
        console.log(error);
    }
};
