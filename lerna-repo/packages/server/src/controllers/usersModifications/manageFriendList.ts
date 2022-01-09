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
        const { friendId, finalStatus } = req.body; // finalStatus is boolean
        const user = res.locals.user;
        const friend = await UserModel.findById(friendId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        if (finalStatus) {
            const result = acceptFriendRequest(user, friend);
            if (!result) {
                return res.status(201).json({
                    message:
                        'Something went wrong, maybe user is already part of your friendList',
                });
            } else {
                res.status(200).json({ message: 'Friend request accepted' });
            }
        } else if (!finalStatus) {
            const result = rejectFriendRequest(user, friend);
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

const acceptFriendRequest = (user: IUser, friend: IUser) => {
    const userFriendList = user.friends;
    const friendFriendList = friend.friends;

    const userId = user._id;
    const friendId = friend._id;

    

    return true;
};

const rejectFriendRequest = (user: IUser, friend: IUser) => {
    return false;
};
