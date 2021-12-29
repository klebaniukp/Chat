import { IFullFriendData } from '../../types/types';

export const getFulfilledFriendList = (
    state: IFullFriendData[],
    action: { type: string; payload: IFullFriendData[] },
) => {
    try {
        switch (action.type) {
            case 'SET_FULLFILLED_FRIEND_DATA':
                return action.payload;
            default:
                if (state) {
                    return state;
                } else {
                    return [
                        {
                            _id: 'x',
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
