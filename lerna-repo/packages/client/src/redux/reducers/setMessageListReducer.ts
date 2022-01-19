import { IMessage } from '../../types/types';

export const setMessageListReducer = (
    state: IMessage[],
    action: { type: string; payload: IMessage[] },
) => {
    try {
        switch (action.type) {
            case 'SET_MESSAGE_LIST':
                return action.payload;
            case 'ADD_MESSAGE':
                return [...state, action.payload];
            case 'CLEAR_MESSAGE_LIST':
                return [
                    {
                        value: '',
                        senderId: '',
                    },
                ];
            default:
                if (state) return state;
                return [
                    {
                        value: '',
                        senderId: '',
                    },
                ];
        }
    } catch (error) {
        console.log(error);
    }
};
