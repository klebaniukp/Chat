import { combineReducers } from 'redux';
import { getFriendsReducer as friends } from './getFriendsReducer';
import { getUserDataReducer as userData } from './getUserDataReducer';

export const reducers = combineReducers({ friends, userData });
