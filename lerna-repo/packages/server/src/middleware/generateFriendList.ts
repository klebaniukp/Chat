import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUser } from '../interfaces/IUser';
import { IUserFriend, IFriend } from '../types/types';
import jwt from 'jsonwebtoken';

//NOT FINISHED

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

        friendList.map((friend: IUserFriend) => {
            // const convertedFriend: IFriend = {};
            // filledFriendList.push(convertedFriend);
        });

        // Promise.all(user).then(() => {
        //     if (user.length === 1) {
        //         const friendList: IUserFriend[] = user[0].friends;

        //         const filledFriendList: IFriend[] = [];
        //         //converting friendlist so it can be fulfilled
        //         friendList.map(friend => {
        //             // console.log(friend)
        //             UserModel.findOne({ _id: friend._id }).then(response => {
        //                 if (response) {
        //                     const user: IFriend = {
        //                         email: response.email,
        //                         name: response.name,
        //                         lastName: response.lastName,
        //                     };
        //                 }
        //             });
        //         });
        //     }
        // });

        // const { friendList } = req.body;

        // console.log(friendList);

        // if (!friendList) {
        //     console.log('exiting generateFriendList middleware');
        //     return res.status(400).json({ message: 'Empty friend list' });
        // }

        // const filledFriendList: IFriend[] = [];

        // const friends = friendList.map((userId: string) => {
        //     return UserModel.findOne({ id: userId })
        //         .then(res => {
        //             const user = res;

        //             delete (user as IResUser).password;
        //             delete (user as IResUser).friends;
        //             delete (user as IResUser)._id;

        //             if (user) {
        //                 filledFriendList.push(user);
        //             }
        //             // console.log(filledFriendList);
        //             // return filledFriendList;
        //         })
        //         .catch(error => {
        //             console.log(error);
        //         });
        // });

        // Promise.all(friends).then(() => {
        //     // console.log(response);
        //     console.log(filledFriendList);
        //     res.status(200).json({ friendList: filledFriendList });
        // });

        // // console.log(`filledFriendList: (mid) ${filledFriendList}`);

        // // Promise.all(friends).then((res) => {
        // //     console.log(res);
        // // })
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
