import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const token: string = req.cookies.token;
        let decodedToken: string | null | JwtPayload = '';
        // validate token -> get userId from token -> update model(userId, friendId) 2 models

        if (process.env.JWT_SECRET_TOKEN != undefined)
            if (jwt.verify(token, process.env.JWT_SECRET_TOKEN)) {
                decodedToken = jwt.decode(token);

                const user = await UserModel.findOne({
                    _id: JSON.stringify(JSON.parse(decodedToken).id),
                }).lean();
            }

        const searchedUser = await UserModel.findOne({
            _id: userId, //set name of userId in frontend form
        }).lean();

        // searchedUser.friends;

        if (!searchedUser) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        // await user.save();

        res.status(200).json({ message: 'Friend request sent' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
