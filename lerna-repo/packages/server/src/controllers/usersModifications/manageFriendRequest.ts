import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const manageFriendRequest = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const { friendId, finalStatus } = req.body; // finalStatus is boolean
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const acceptFriendRequest = async (userId: string, friendId: string) => {
    try {
        const user = await UserModel.findById(userId);
        const friend = await UserModel.findById(friendId);

        if (!user || !friend) {
            return 'User not found';
        }

        const userFriends = user.friends.map(user => {
            if (user.friendRequestStatus === false) {
                return {
                    _id: user._id,
                    friendRequestStatus: user.friendRequestStatus,
                };
            }
        });
    } catch (error) {
        console.log(error);
    }
};
