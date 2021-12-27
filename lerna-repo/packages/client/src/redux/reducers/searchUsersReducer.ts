import { ISearchedUser } from '../../types/types';

interface IState {
    data: ISearchedUser[] | null | undefined;
}

export const searchUsersReducer = (
    state: IState,
    action: { type: string; payload: ISearchedUser[] },
) => {
    try {
        switch (action.type) {
            case 'SEARCH_USERS':
                return action.payload;
            default:
                return [
                    {
                        _id: 'x',
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
