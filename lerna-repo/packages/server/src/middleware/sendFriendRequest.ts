import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IFriend } from '../interfaces/IUser';

interface IResUser {
    id: string;
    email: string;
    lastName: string;
    name: string;
    password?: string;
    friends: IFriend[];
}

export const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body;
        const token: string = req.cookies.token;
        // let decodedToken: string | null | JwtPayload = '';
        // validate token -> get userId from token -> update model(userId, friendId) 2 models

        const searchedUser = await UserModel.findOne({
            _id: userId, //set name of userId in frontend form
        }).lean();

        if (process.env.JWT_SECRET_TOKEN != undefined)
            if (jwt.verify(token, process.env.JWT_SECRET_TOKEN)) {
                const decodedToken = JSON.stringify(jwt.decode(token));
                const userTokenId = JSON.parse(decodedToken).id;

                const user = await UserModel.findOne({
                    _id: userTokenId,
                }).lean();

                if (user !== null && searchedUser !== null) {
                    delete (user as IResUser).password;
                    delete (searchedUser as IResUser).password;

                    //userData & searchedUserData -> models that match friend array
                    const userData = {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                        friendRequestStatus: 'pending',
                    };

                    const searchedUserData = {
                        _id: searchedUser._id,
                        email: searchedUser.email,
                        name: searchedUser.name,
                        lastName: searchedUser.lastName,
                        friendRequestStatus: 'pending',
                    };

                    user.friends.push(searchedUserData);
                    searchedUser.friends.push(userData);
                }
            } else {
                res.status(401).json({ message: 'Unauthorized' });
            }

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
