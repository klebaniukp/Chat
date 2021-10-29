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

userRouter.post('/login', signin);
userRouter.get('/login', testLogin);
userRouter.post('/register', signup);
userRouter.get('/register', testRegister);
userRouter.get('/', helloWorld);
