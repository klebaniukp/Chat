import { IFullFriendData } from '../../types/types';

export const setFulfilledFriendList =
    (fulfilledFriendData: IFullFriendData) =>
    (dispatch: (arg0: { type: string; payload: IFullFriendData }) => void) => {
        try {
            dispatch({
                type: 'SET_FULFILLED_FRIENDLIST',
                payload: fulfilledFriendData,
            });
        } catch (error) {
            console.log(error);
        }
    };
