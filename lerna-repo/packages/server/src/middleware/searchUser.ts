import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import { IUser } from '../types/types';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const searchUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.token;

        if (jwt.decode(token) === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        const friendList = user.friends;

        const { searchPhraze } = req.body;

        const search: IUser[] = await UserModel.find({
            $or: [
                { name: { $regex: searchPhraze, $options: 'i' } },
                { lastName: { $regex: searchPhraze, $options: 'i' } },
                { email: { $regex: searchPhraze, $options: 'i' } },
            ],
        }).exec();

        if (search.length !== 0) {
            Promise.all(search).then(() => {
                const searchResult = search.map(user => {
                    return {
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                    };
                });

                res.locals.searchResult = searchResult;
                next();
            });
        } else {
            const search = await UserModel.findOne({
                _id: searchPhraze,
            }).exec();

            if (!search) {
                return res.status(200).json({ message: 'No user found' });
            }

            let friendRequestStatus = false;

            // for (let i = 0; i < friendList.length; i++) {
            //     console.log(`new ObjectId("${friendList[i]._id}")`);
            //     console.log(search._id);
            //     console.log(search);

            //     if (`new ObjectId("${friendList[i]._id}")` === search._id) {
            //         console.log('accepted');
            //         console.log(friendList[i].friendRequestStatus);
            //         friendRequestStatus = friendList[i].friendRequestStatus;
            //     }
            //     if (
            //         i === friendList.length - 1 &&
            //         friendRequestStatus === false
            //     ) {
            //         return res.status(200).json({
            //             searchResult: {
            //                 email: search.email,
            //                 name: search.name,
            //                 lastName: search.lastName,
            //                 friendRequestStatus: null,
            //             },
            //         });
            //     }
            // }

            const reducedUser = [
                {
                    email: search.email,
                    name: search.name,
                    lastName: search.lastName,
                    friendRequestStatus: friendRequestStatus,
                },
            ];

            return res.status(200).json({ searchResult: reducedUser });
            // res.locals.searchResult = reducedUser;
            // next();
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
