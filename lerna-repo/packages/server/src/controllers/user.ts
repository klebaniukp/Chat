import { Request, Response, NextFunction, response } from 'express';
import { UserModel } from '../models/User';
import { passwordSchema } from '../models/Password';
import { IResUser } from '../types/types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const refreshToken = process.env.JWT_REFRESH_TOKEN as string;
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

        const token = jwt.sign(
            { email: newUser.email, id: newUser._id },
            secret,
            { expiresIn: '60m' },
        );

        UserModel.findOne({ email: newUser.email })
            .then(response => {
                if (response) {
                    const result = {
                        _id: response._id,
                        name: response.name,
                        lastName: response.lastName,
                        friends: response.friends,
                    };

                    return res
                        .status(200)
                        .clearCookie('token')
                        .cookie('token', token, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                        .cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                        .json({ result });
                }
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const signin = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const refreshToken = process.env.JWT_REFRESH_TOKEN as string;
    const { email, password } = req.body;
    const maxAge = 1000 * 60 * 60;
    const ipAddress = req.socket.remoteAddress;

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
            { expiresIn: '60m' },
        );

        UserModel.findOne({ email: email })
            .then(response => {
                if (response) {
                    console.log(`friends: ${response.friends}`);
                    const user = {
                        _id: response._id,
                        email: response.email,
                        name: response.name,
                        lastName: response.lastName,
                        friends: response.friends,
                    };

                    return res
                        .status(200)
                        .clearCookie('token')
                        .cookie('token', token, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                        .cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                        .json({ result: user, message: 'Logged in' });
                }
            })
            .catch(error => {
                console.log(error);
            });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

export const helloWorld = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello World' });
};
