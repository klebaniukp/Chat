import express from 'express';
import { signup, signin, helloWorld } from '../controllers/user';
import { auth } from '../middleware/auth';
import { searchUser } from '../middleware/searchUser';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.post('/', helloWorld);
userRouter.post('/session', auth);
userRouter.get('/searchUser', searchUser);
