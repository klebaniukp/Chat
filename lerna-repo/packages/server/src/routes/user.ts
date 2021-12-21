import express from 'express';
import { signup, signin, helloWorld } from '../controllers/user';
import { auth } from '../middleware/auth';
import { searchUser } from '../middleware/searchUser';
import { sendFriendRequest } from '../middleware/sendFriendRequest';
import { updateUserData } from '../middleware/updateUserData';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.post('/', helloWorld);
userRouter.get('/getUser', auth);
userRouter.post('/addUser', sendFriendRequest);
userRouter.get('/searchUser', searchUser);
userRouter.post('/updateUser', updateUserData);
