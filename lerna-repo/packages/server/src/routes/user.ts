import express from 'express';
import {
    signup,
    helloWorld,
    testRegister,
    testLogin,
    signin,
} from '../controllers/user';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/signin', signin);
userRouter.get('/signin', testLogin);
userRouter.post('/signup', signup);
userRouter.get('/signup', testRegister);
userRouter.get('/', helloWorld);
