//update user data from mongoDb model
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

export const updateUserData = async (req: Request, res: Response) => {
    try {
        const { name, email, lastName } = req.body;
        const token = req.cookies.token;
        const secret = process.env.JWT_SECRET_TOKEN as string;

        if (jwt.verify(token, secret)) {
            const decodedToken = JSON.stringify(jwt.decode(token));
            const userId = JSON.parse(decodedToken).id;

            const filter = { _id: userId };
            const update = {
                email: email,
                name: name,
                lastName: lastName,
            };

            await UserModel.findOneAndUpdate(filter, update);
        }
    } catch (error) {
        console.log(error);
    }
};

export {};
