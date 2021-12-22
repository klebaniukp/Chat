import { ISearchedUser } from '../../types/types';

export const searchUsers =
    (searchedUser: ISearchedUser[]) =>
    (dispatch: (arg0: { type: string; payload: ISearchedUser[] }) => void) => {
        try {
            dispatch({
                type: 'SEARCH_USERS',
                payload: searchedUser,
            });
        } catch (error) {
            console.log(error);
        }
    };
