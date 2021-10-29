import express from 'express';
import { signup, helloWorld, testRegister } from '../controllers/user';

export const userRouter = express.Router();

userRouter.use(express.json());

userRouter.post('/register', signup);
// app.post('/login', signin);
// userRouter.get('/login', testLogin);
userRouter.get('/register', testRegister);
userRouter.get('/', helloWorld);
