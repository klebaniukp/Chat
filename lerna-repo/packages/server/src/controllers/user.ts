import { Request, Response } from 'express';
import { IUser } from '../interfaces/IUser';
import { UserModel } from '../models/User';
import bcrypt from 'bcrypt';

const users: IUser[] = [];

interface IresUser {
    id: string;
    email: string;
    name: string;
    password: string;
}

export const signup = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            name,
            password: hashedPassword,
        };

        const result = await UserModel.findOne({ email: newUser.email }).lean();

        const token = jwt.sign()

        console.log(newUser);

        res.status(201).send('registered');
    } catch (err) {
        res.status(500).json({ message: (err as any).message });
    }
};

export const signin = async (req: Request, res: Response) => {
    const user = users.find(user => user.name === req.body.name);
    try {
        if (user != undefined) {
            const isPasswordCorrect = await bcrypt.compare(
                req.body.password,
                user.password,
            );
            if (isPasswordCorrect) {
                res.send('logged in');
                console.log('logged in');
            }
        }
    } catch (err) {
        res.send(500).json({ message: 'something went wrong' });
    }
};

/*  ###  */

export const helloWorld = (req: Request, res: Response) => {
    res.send('hello world - custom');
};

export const testRegister = (req: Request, res: Response) => {
    res.json(users);
};

export const testLogin = (req: Request, res: Response) => {
    res.send('login page');
};
