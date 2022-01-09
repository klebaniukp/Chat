import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IFriendList } from '../../types/types';

export const isIdInUserFriendList = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const { friendId } = req.body;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        const friendList: IFriendList = {};

        for (let i = 0; i < user.friends.length; i++) {
            friendList[user.friends[i]._id] = {
                _id: user.friends[i]._id,
                friendRequestStatus: user.friends[i].friendRequestStatus,
                senderId: user.friends[i].senderId,
            };
        }

        if (friendList[friendId]) {
            res.locals.user = user;
            next();
        } else {
            return res
                .status(201)
                .json({ message: 'User is not on your friendList' });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
