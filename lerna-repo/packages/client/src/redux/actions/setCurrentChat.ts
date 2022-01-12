import { IChat } from '../../types/types';

export const setCurrentChat =
    (currentChat: IChat) =>
    (dispatch: (arg0: { type: string; payload: IChat }) => void) => {
        try {
            dispatch({
                type: 'SEARCH_USERS',
                payload: currentChat,
            });
        } catch (error) {
            console.log(error);
        }
    };
