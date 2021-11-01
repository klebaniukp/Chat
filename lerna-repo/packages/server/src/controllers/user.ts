import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

interface IResUser {
    id: string;
    email: string;
    name: string;
    password?: string;
}

export const signup = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const { email, name, password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email: email });

        if (oldUser)
            return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            email,
            name,
            password: hashedPassword,
        });

        const result = await UserModel.findOne({ email: newUser.email }).lean();

        console.log(`result:${result}, secret:${secret}`);

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            secret,
            { expiresIn: '1d' },
        );

        console.log(token);

        delete (result as IResUser).password;

        console.log(newUser);

        res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .json({ result });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const signin = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const { email, password } = req.body;
    try {
        const oldUser = await UserModel.findOne({ email: email });

        if (!oldUser)
            return res.status(404).json({ message: 'User not found' });

        const isPasswordCorrect = await bcrypt.compare(
            password,
            oldUser.password,
        );

        console.log(isPasswordCorrect);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            secret,
            { expiresIn: '1d' },
        );

        console.log(token);

        delete (oldUser as IResUser).password;

        console.log('logged in');
        res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .json({ result: oldUser });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

/*  ###  */

export const helloWorld = (req: Request, res: Response) => {
    res.send('hello world - custom');
};

export const testRegister = (req: Request, res: Response) => {
    res.json(UserModel);
};

export const testLogin = (req: Request, res: Response) => {
    res.send('login page');
};
