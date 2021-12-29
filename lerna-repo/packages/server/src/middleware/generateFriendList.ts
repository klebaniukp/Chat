import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUserFriend, IFriend } from '../types/types';
import jwt from 'jsonwebtoken';

export const generateFriendList = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        const decodedToken = JSON.stringify(jwt.decode(token));
        const userId = JSON.parse(decodedToken).id;

        const filter = { _id: userId };

        const user = await UserModel.findOne(filter);

        if (!user) {
            return res.status(404).json({ message: 'Invalid jwt token' });
        }

        const friendList = user.friends;

        const filledFriendList: IFriend[] = [];

        const friendMap = friendList.map((friend: IUserFriend) => {
            const filter = { _id: friend._id };
            return UserModel.findOne(filter).then(res => {
                if (res) {
                    const friendDb: IFriend = {
                        email: res.email,
                        name: res.name,
                        lastName: res.lastName,
                    };

                    filledFriendList.push(friendDb);
                }
            });
        });

        Promise.all(friendMap)
            .then(() => {
                console.log(`filled friend list: ${filledFriendList}`);
                return res.status(200).json({ friendList: filledFriendList });
            })
            .catch(error => {
                return res.status(500).json({ error: error.message });
            });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
