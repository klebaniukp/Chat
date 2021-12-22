import { combineReducers } from 'redux';
import { getUserDataReducer as userData } from './getUserDataReducer';
import { searchUsersReducer as searchResults } from './searchUsersReducer';

export const reducers = combineReducers({ searchResults, userData });
