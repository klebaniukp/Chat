import express from 'express';
import { signup, signin, helloWorld } from '../controllers/user';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signin', signin);
userRouter.post('/signup', signup);
userRouter.post('/user', helloWorld);
