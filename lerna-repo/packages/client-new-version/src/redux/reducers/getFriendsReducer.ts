import { IFriend } from '../../types/types';

// interface IState {
//     data: IFriend | null | undefined;
// }

export const getFriendsReducer = (
    state: IFriend[] = [],
    action: { type: string; payload: IFriend },
) => {
    try {
        switch (action.type) {
            case 'GET_FRIENDS':
                return [action.payload];
            default:
                return state;
        }
    } catch (error) {
        console.log(error);
    }
};
