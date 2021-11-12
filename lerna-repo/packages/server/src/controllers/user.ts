import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { passwordSchema } from '../models/Password';
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
    const specialSigns = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const { email, name, lastName, password } = req.body;
    try {
        let oldUser = await UserModel.findOne({ email: email });

        if (oldUser)
            return res
                .status(400)
                .json({ message: 'This email is already in use' });

        oldUser = await UserModel.findOne({ name: name });

        console.log(`name: ${name} lastName: ${lastName} email: ${email}`);

        if (oldUser)
            return res
                .status(400)
                .json({ message: 'This is username is taken' });

        if (!passwordSchema.validate(password))
            return res
                .status(400)
                .json({ message: 'Password does not match credentials' });

        if (!specialSigns.test(password))
            return res
                .status(400)
                .json({ message: 'Password does not match credentials' });

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = await UserModel.create({
            email,
            name,
            lastName,
            password: hashedPassword,
        });

        const result = await UserModel.findOne({ email: newUser.email }).lean();

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            secret,
            { expiresIn: '1d' },
        );

        console.log(token);

        delete (result as IResUser).password;

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

        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { email: oldUser.email, id: oldUser._id },
            secret,
            { expiresIn: '1d' },
        );

        delete (oldUser as IResUser).password;

        console.log('logged in');
        res.status(200)
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .json({ result: oldUser, message: 'Logged in' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};


export const helloWorld = (req: Request, res: Response) => {
    res.send('hello world - custom');
};

export const testRegister = (req: Request, res: Response) => {
    res.send('sign up');
};

export const testLogin = (req: Request, res: Response) => {
    res.send('login page');
};
