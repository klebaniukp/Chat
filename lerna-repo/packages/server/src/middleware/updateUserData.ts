//update user data from mongoDb model
import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { IFriend } from '../types/types';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const updateUserData = async (req: Request, res: Response) => {
    try {
        const { name, email, lastname } = req.body;

        const token = req.cookies.token;

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const filter = { _id: userId };
        const update = {
            email: email,
            name: name,
            lastName: lastname,
        };

        await UserModel.findOneAndUpdate(filter, update);

        const user: IUser[] = await UserModel.find(filter).exec();

        Promise.all(user).then(() => {
            if (user.length === 1) {
                const convertedUser: IFriend = {
                    email: user[0].email,
                    name: user[0].name,
                    lastName: user[0].lastName,
                };

                res.status(200).json({
                    result: convertedUser,
                    message: 'User data updated',
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
