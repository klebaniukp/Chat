import { ISearchedUser } from '../../types/types';

export const searchUsersReducer = (
    state: ISearchedUser[],
    action: { type: string; payload: ISearchedUser[] },
) => {
    try {
        switch (action.type) {
            case 'SEARCH_USERS':
                return action.payload;
            default:
                if (state) {
                    return state;
                } else {
                    return [
                        {
                            _id: 'x',
                            email: 'example@gmail.com',
                            name: 'Example',
                            lastName: 'Friend',
                        },
                    ];
                }
        }
    } catch (error) {
        console.log(error);
    }
};
