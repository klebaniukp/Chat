import express from 'express';
import { signup, signin } from '../controllers/user/user';
import { logout } from '../controllers/user/logout';
import { auth } from '../middleware/auth/auth';
import { searchUser } from '../controllers/searchUser';
import { sendFriendRequest } from '../controllers/usersModifications/sendFriendRequest';
import { doesArrayContainFriends } from '../middleware/friendList/doesArrayContainFriends';
import { updateUserData } from '../controllers/user/updateUserData';
import { authentication } from '../middleware/auth/authentication';
import { generateFriendList } from '../controllers/user/generateFriendList';
import { manageFriendRequest } from '../controllers/usersModifications/manageFriendList';
import { isIdInUserFriendList } from '../middleware/friendList/isIdInUserFriendList';
import { removeFriend } from '../controllers/usersModifications/manageFriendList';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.get('/getUser', auth);
userRouter.post(
    '/searchUser',
    authentication,
    searchUser,
    doesArrayContainFriends,
);
userRouter.post('/updateUser', authentication, updateUserData);
userRouter.get('/generateFriendList', authentication, generateFriendList);
userRouter.get('/logout', logout);
userRouter.post('/sendFriendRequest', authentication, sendFriendRequest);
userRouter.post(
    '/manageFriendRequest',
    authentication,
    isIdInUserFriendList,
    manageFriendRequest,
);
userRouter.post(
    '/removeFriend',
    authentication,
    isIdInUserFriendList,
    removeFriend,
);

userRouter.post('/getMessages'); //todo
userRouter.post('/sendMessage'); //todo

// userRouter.post('deleteFriend', authentication, deleteFriend);

//authentication - check if token is valid and if so cast next()
//auth - check if token is valid & if so generate new token & return user data from old token
