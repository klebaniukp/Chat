import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import { passwordSchema } from '../../models/Password';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../../interfaces/IUser';

export const signup = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const refreshToken = process.env.JWT_REFRESH_TOKEN as string;
    const specialSigns = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const { email, name, lastName, password } = req.body;
    const maxAge = 1000 * 60 * 60;

    try {
        const oldUser = await UserModel.findOne({ email: email });

        if (oldUser)
            return res
                .status(400)
                .json({ message: 'This email is already in use' });

        if (!passwordSchema.validate(password))
            return res.status(400).json({
                message:
                    'Invalid password, check length, capital letters and number appearance',
            });

        if (!specialSigns.test(password))
            return res.status(400).json({
                message: 'Invalid password, provide special sign',
            });

        const hashedPassword = await bcrypt.hash(password, 12);

        const defaultFriend = await UserModel.findOne({
            email: 'default@friend.com',
        });

        if (!defaultFriend) {
            return res.status(500).json({
                message: 'Default friend not found, probably connection issue',
            });
        }

        const friendObj = {
            _id: defaultFriend._id,
            email: defaultFriend.email,
            friendRequestStatus: true,
        };

        const newUser: IUser = await UserModel.create({
            email: email,
            name: name,
            lastName: lastName,
            password: hashedPassword,
            friends: [friendObj],
        });

        console.log(`newuser email: ${newUser.email}`);

        const newUserObjectToUpdate = {
            _id: newUser._id,
            email: newUser.email,
            friendRequestStatus: true,
        };

        await UserModel.findOneAndUpdate(
            { email: 'default@friend.com' },
            {
                $push: {
                    friends: newUserObjectToUpdate,
                },
            },
        );

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
                        email: response.email,
                        name: response.name,
                        lastName: response.lastName,
                        friends: response.friends,
                    };

                    console.log(`result: ${JSON.stringify(result)}`);

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

export const signin = async (req: Request, res: Response) => {
    const secret = process.env.JWT_SECRET_TOKEN as string;
    const refreshToken = process.env.JWT_REFRESH_TOKEN as string;
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

export const isUserMyFriend = async (req: Request, res: Response) => {
    try {
        const { possibleFriendEmail } = req.body;
        const token = req.cookies.token;

        if (jwt.decode(token) === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const user = await UserModel.findById(userId);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
