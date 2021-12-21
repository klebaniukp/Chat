import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';

export const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const token = req.cookies.token;

        const decodedToken = JSON.stringify(jwt.decode(token));
        const userTokenId = JSON.parse(decodedToken).id;

        const searchedUser = await UserModel.findOne({
            _id: userId,
        }).lean();

        if (!searchedUser) {
            res.status(404).json({ message: 'User not found' });
        }

        await UserModel.findOneAndUpdate(
            { _id: userTokenId },
            {
                $push: {
                    friends: {
                        _id: userId,
                        friendRequestStatus: 'pending',
                    },
                },
            },
        );
        await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    friends: {
                        _id: userTokenId,
                        friendRequestStatus: 'pending',
                    },
                },
            },
        );

        res.status(200).json({ message: 'Friend request sent' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
