import { Request, Response, NextFunction } from 'express';
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
    const maxAge = 1000 * 60 * 60;

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
            { expiresIn: '10m' },
        );

        console.log(token);

        delete (result as IResUser).password;

        res.status(200)
            // .clearCookie('token')
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: maxAge,
            })
            .json({ result });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const { email, password } = req.body;
    const maxAge = 1000 * 60 * 60;

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
            { expiresIn: '10m' },
        );

        console.log(`token: ${token} type: ${typeof token}`);

        delete (oldUser as IResUser).password;

        console.log('logged in');
        res.status(200)
            // .clearCookie('token')
            .cookie('token', token, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: maxAge,
            })
            .json({ result: oldUser, message: 'Logged in' });
        next(token);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const helloWorld = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World' });
};
