import { combineReducers } from 'redux';
import { getUserDataReducer as userData } from './getUserDataReducer';
import { searchFriendsReducer as searchResults } from './searchFriendsReducer';

export const reducers = combineReducers({ searchResults, userData });
