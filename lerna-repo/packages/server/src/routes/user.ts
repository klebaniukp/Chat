import express from 'express';
import { signup, signin, helloWorld } from '../controllers/user';
import { auth } from '../middleware/auth';
import { searchUser } from '../middleware/searchUser';
import { sendFriendRequest } from '../middleware/sendFriendRequest';
import { updateUserData } from '../middleware/updateUserData';
import { authentication } from '../middleware/authentication';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.post('/', helloWorld);
userRouter.get('/getUser', auth);
userRouter.post('/addUser', authentication, sendFriendRequest);
userRouter.get('/searchUser', authentication, searchUser);
userRouter.post('/updateUser', authentication, updateUserData);

//authentication - check if token is valid and if so cast next()
//auth - check if token is valid & if so generate new token & return user data from old token
