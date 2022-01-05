import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IFriendReqStatus } from '../../types/types';

export const sendFriendRequest = async (req: Request, res: Response) => {
    const updateUserFriendList = async (
        userId: string,
        idToUpdate: string,
        email: string,
        friendRequestStatus: boolean,
    ) => {
        try {
            const filter = { _id: userId };
            const userObjectToUpdate = {
                _id: idToUpdate,
                email: email,
                friendRequestStatus: friendRequestStatus,
            };
            const update = {
                $push: { friends: userObjectToUpdate },
            };

            await UserModel.findOneAndUpdate(filter, update);
        } catch (error) {
            console.log(error);
        }
    };

    try {
        const friendToAddId = req.body.id;
        const token = req.cookies.token;

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        const friendToAdd = await UserModel.findById(friendToAddId);

        if (!friendToAdd) {
            return res
                .status(404)
                .json({ message: 'User you are trying to add do not exist' });
        }

        updateUserFriendList(friendToAddId, userId, user.email, false);

        updateUserFriendList(userId, friendToAddId, friendToAdd.email, false);

        return res.status(200).json({ message: 'Friend request sent' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
