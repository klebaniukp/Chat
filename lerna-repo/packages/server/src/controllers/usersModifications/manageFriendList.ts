import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import { IUserFriend, IFriendList } from '../../types/types';

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
    } catch (error) {}
};

export const manageFriendRequest = async (req: Request, res: Response) => {
    try {
        const { friendId, finalStatus } = req.body;

        const user = res.locals.user;
        const friend = await UserModel.findById(friendId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }

        const userFriendList = createObjectWithFieldsFromArray(user.friends);
        const friendFriendList = createObjectWithFieldsFromArray(
            friend.friends,
        );

        if (finalStatus) {
            const result = acceptFriendRequest(
                user._id,
                friend._id,
                userFriendList,
                friendFriendList,
            );
            if (!result) {
                return res.status(201).json({
                    message:
                        'Something went wrong, maybe user is already part of your friendList',
                });
            } else {
                res.status(200).json({ message: 'Friend request accepted' });
            }
        } else if (!finalStatus) {
            const result = rejectFriendRequest(
                user._id,
                friend._id,
                userFriendList,
                friendFriendList,
            );
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

const acceptFriendRequest = async (
    userId: string,
    friendId: string,
    userFriendList: IFriendList,
    friendFriendlist: IFriendList,
) => {
    userFriendList[friendId] = {
        _id: friendId,
        friendRequestStatus: true,
        senderId: userFriendList[friendId].senderId,
    };

    friendFriendlist[userId] = {
        _id: userId,
        friendRequestStatus: true,
        senderId: friendFriendlist[userId].senderId,
    };

    if (
        (await updateFriendList(userId, Object.values(userFriendList))) &&
        (await updateFriendList(friendId, Object.values(friendFriendlist)))
    ) {
        return true;
    } else {
        return false;
    }
};

const rejectFriendRequest = async (
    userId: string,
    friendId: string,
    userFriendList: IFriendList,
    friendFriendlist: IFriendList,
) => {
    delete userFriendList[friendId];
    delete friendFriendlist[userId];

    if (
        (await updateFriendList(userId, Object.values(userFriendList))) &&
        (await updateFriendList(friendId, Object.values(friendFriendlist)))
    ) {
        return true;
    } else {
        return false;
    }
};

const createObjectWithFieldsFromArray = (array: IUserFriend[]) => {
    const object: IFriendList = {};

    for (let i = 0; i < array.length; i++) {
        object[array[i]._id] = {
            _id: array[i]._id,
            friendRequestStatus: array[i].friendRequestStatus,
            senderId: array[i].senderId,
        };
    }

    return object;
};

export const removeFriend = async (req: Request, res: Response) => {
    try {
        const { friendId } = req.body;

        const user = res.locals.user;
        const friend = await UserModel.findById(friendId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        if (!friend) {
            return res.status(404).json({
                message: 'User you are trying to delete do not exist',
            });
        }

        const userFriendList = createObjectWithFieldsFromArray(user.friends);
        const friendFriendList = createObjectWithFieldsFromArray(
            friend.friends,
        );

        delete userFriendList[friendId];
        delete friendFriendList[user._id];

        if (
            (await updateFriendList(user._id, Object.values(userFriendList))) &&
            (await updateFriendList(
                friend._id,
                Object.values(friendFriendList),
            ))
        ) {
            return res.status(200).json({ message: 'Friend removed' });
        } else {
            return res.status(500).json({
                message: 'Something went wrong, maybe user is already removed',
            });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
