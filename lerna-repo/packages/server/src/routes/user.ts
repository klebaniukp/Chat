import express from 'express';
import { signup, helloWorld, testRegister } from '../controllers/user';

export const userRouter = express.Router();

userRouter.post('/register', signup);
userRouter.get('/register', testRegister);
userRouter.get('/', helloWorld);
