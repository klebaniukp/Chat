import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import '../interfaces/User';

const users: IUser[] = [];

export const signup = async (req: Request, res: Response) => {
    const email: string = req.body.email;
    const name: string = req.body.name;
    try {
        const password: string = await bcrypt.hash(req.body.password, 11); //hashed

        const user = { email, name, password };

        console.log(user);

        users.push(user);
        res.send(201).send('registered');
    } catch (err) {
        res.send(500).json({ message: 'Something went wrong' });
    }
};

export const signin = async (req: Request, res: Response) => {};

export const helloWorld = (req: Request, res: Response) => {
    res.send('hello world - custom');
};

export const testRegister = (req: Request, res: Response) => {
    res.json(users);
};
