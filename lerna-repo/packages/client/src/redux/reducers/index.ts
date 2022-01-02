import { combineReducers } from 'redux';
import { setUserDataReducer as userData } from './setUserDataReducer';
import { searchUsersReducer as searchResults } from './searchUsersReducer';
import { setFulfilledFriendListReducer as fulfilledFriendList } from './setFulfilledFriendListReducer';

export const reducers = combineReducers({
    searchResults,
    userData,
    fulfilledFriendList,
});
