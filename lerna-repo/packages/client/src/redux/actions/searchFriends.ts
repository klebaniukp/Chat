import { ISearchedUser } from '../../types/types';

export const searchFriends =
    (searchedUser: ISearchedUser[]) =>
    (dispatch: (arg0: { type: string; payload: ISearchedUser[] }) => void) => {
        try {
            dispatch({
                type: 'SEARCH_FRIENDS',
                payload: searchedUser,
            });
        } catch (error) {
            console.log(error);
        }
    };
