import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { IResUser } from '../types/types';

export const auth = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const secretToken = process.env.JWT_SECRET_TOKEN as string;

        if (jwt.verify(token, secretToken)) {
            const decodedToken = JSON.stringify(jwt.decode(token));

            console.log(`decodedToken: ${decodedToken}`);

            const user = await UserModel.findOne({
                _id: JSON.parse(decodedToken).id,
            }).lean();

            delete (user as IResUser).password;

            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
