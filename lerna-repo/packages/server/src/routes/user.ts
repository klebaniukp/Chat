import express from 'express';
import { signup, signin } from '../controllers/user/user';
import { logout } from '../controllers/user/logout';
import { auth } from '../middleware/auth';
import { searchUser } from '../controllers/searchUser';
// import { sendFriendRequest } from '../middleware/sendFriendRequest';
import { doesArrayContainFriends } from '../middleware/doesArrayContainFriends';
import { updateUserData } from '../controllers/user/updateUserData';
import { authentication } from '../middleware/authentication';
import { generateFriendList } from '../controllers/user/generateFriendList';

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
// userRouter.post('/sendFriendRequest', authentication, sendFriendRequest);
userRouter.get('/generateFriendList', authentication, generateFriendList);
userRouter.get('/logout', logout);

//authentication - check if token is valid and if so cast next()
//auth - check if token is valid & if so generate new token & return user data from old token
