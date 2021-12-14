import { IFriend } from '../../types/types';

export const getFriends =
    (friend: IFriend) =>
    (dispatch: (arg0: { type: string; payload: IFriend }) => void) => {
        try {
            dispatch({
                type: 'GET_FRIENDS',
                payload: friend,
            });
        } catch (error) {
            console.log(error);
        }
    };
