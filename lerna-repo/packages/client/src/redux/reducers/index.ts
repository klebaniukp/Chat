import { combineReducers } from 'redux';
import { getUserDataReducer as userData } from './getUserDataReducer';
import { searchUsersReducer as searchResults } from './searchUsersReducer';
import { setFulfilledFriendList as fulfilledFriendList } from '../actions/setFulfilledFriendList';

export const reducers = combineReducers({
    searchResults,
    userData,
    fulfilledFriendList,
});
