//update user data from mongoDb model
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

export const updateUserData = async (req: Request, res: Response) => {
    try {
        const { name, email, lastname } = req.body;

        const token = req.cookies.token;

        const decodedToken = JSON.stringify(jwt.decode(token));
        const userId = JSON.parse(decodedToken).id;

        const filter = { _id: userId };
        const update = {
            email: email,
            name: name,
            lastName: lastname,
        };

        const user = await UserModel.findOneAndUpdate(filter, update).lean();

        res.status(200).json({ result: user, message: 'User data updated' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
