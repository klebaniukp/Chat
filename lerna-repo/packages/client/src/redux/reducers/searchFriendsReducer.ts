import { ISearchedUser } from '../../types/types';

interface IState {
    data: ISearchedUser[] | null | undefined;
}

export const searchFriendsReducer = (
    state: IState,
    action: { type: string; payload: ISearchedUser[] },
) => {
    try {
        switch (action.type) {
            case 'SEARCH_FRIENDS':
                return action.payload;
            default:
                return [
                    {
                        id: 'x',
                        email: 'example@gmail.com',
                        name: 'Example',
                        lastName: 'Friend',
                    },
                ];
        }
    } catch (error) {
        console.log(error);
    }
};
