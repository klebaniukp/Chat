import { IMessage } from '../../types/types';

export const setMessageList =
    (messageList: IMessage[]) =>
    (dispatch: (arg0: { type: string; payload: IMessage[] }) => void) => {
        try {
            dispatch({
                type: 'SET_IS_SHOW_PASSWORD',
                payload: messageList,
            });
        } catch (error) {
            console.log(error);
        }
    };
