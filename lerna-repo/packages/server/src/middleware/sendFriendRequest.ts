import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const { userToAddId } = req.body;
        const token = req.cookies.token;

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const searchedUser = await UserModel.findOne({
            _id: userToAddId,
        }).lean();

        if (!searchedUser) {
            res.status(404).json({ message: 'User not found' });
        }

        //updating user from token
        await UserModel.findOneAndUpdate(
            { _id: userId },
            {
                $push: {
                    friends: {
                        _id: userId,
                        friendRequestStatus: 'pending',
                    },
                },
            },
        );

        //updating user that has been added by token user
        await UserModel.findOneAndUpdate(
            { _id: userToAddId },
            {
                $push: {
                    friends: {
                        _id: userId,
                        friendRequestStatus: 'pending',
                    },
                },
            },
        );

        const updatedUser = await UserModel.findOne({ _id: userId }).lean();

        res.status(200).json({
            message: 'Friend request sent',
            updatedUser: updatedUser,
        });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
