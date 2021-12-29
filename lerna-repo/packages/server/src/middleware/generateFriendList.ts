import { Request, Response } from 'express';
import { UserModel } from '../models/User';

export const generateFriendList = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

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
