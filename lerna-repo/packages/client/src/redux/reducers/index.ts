import { combineReducers } from 'redux';
import { setUserDataReducer as userData } from './setUserDataReducer';
import { searchUsersReducer as searchResults } from './searchUsersReducer';
import { setFulfilledFriendListReducer as friendList } from './setFulfilledFriendListReducer';
import { isShowPasswordReducer as showPassword } from './isShowPasswordReducer';
import { setCurrentChatReducer as currentChat } from './setCurrentChatReducer';
import { setMessageListReducer as messageList } from './setMessageListReducer';

export const reducers = combineReducers({
    searchResults,
    userData,
    friendList,
    showPassword,
    currentChat,
    messageList,
});
