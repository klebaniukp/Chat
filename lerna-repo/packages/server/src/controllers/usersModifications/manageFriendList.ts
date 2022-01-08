import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser, IUserFriend } from '../../types/types';

const updateFriendList = async (_id: string, friendList: IUserFriend[]) => {
    try {
        const filter = {
            _id: _id,
        };
        const update = {
            friends: friendList,
        };

        await UserModel.findOneAndUpdate(filter, update);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

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

        if (finalStatus) {
            const result = acceptFriendRequest(userId, friendId);
            if (!result) {
                return res.status(201).json({
                    message:
                        'Something went wrong, maybe user is already part of your friendList',
                });
            } else {
                res.status(200).json({ message: 'Friend request accepted' });
            }
        } else if (!finalStatus) {
            const result = rejectFriendRequest(userId, friendId);
            if (!result) {
                return res.status(201).json({
                    message:
                        'Something went wrong, maybe user is already deleted from your friendList',
                });
            } else {
                res.status(200).json({ message: 'Friend request rejected' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

const acceptFriendRequest = (userId: string, friendId: string) => {
     

    return true;
};

const rejectFriendRequest = (userId: string, friendId: string) => {
    return false;
};
