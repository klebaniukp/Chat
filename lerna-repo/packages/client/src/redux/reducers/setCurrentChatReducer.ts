import { IChat } from '../../types/types';

export const setCurrentChatReducer = (
    state: IChat,
    action: { type: string; payload: IChat },
) => {
    try {
        switch (action.type) {
            case 'SET_CURRENT_CHAT':
                return action.payload;
            case 'CLEAR_CURRENT_CHAT':
                return {
                    _id: '',
                    name: '',
                    lastname: '',
                    email: '',
                };
            default:
                if (state) return state;
                return {
                    _id: '',
                    name: '',
                    lastname: '',
                    email: '',
                };
        }
    } catch (error) {
        console.log(error);
    }
};
