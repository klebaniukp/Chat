import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ISearchResult } from '../types/types';

export const searchUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        // const friendList = user.friends;

        const { searchPhraze } = req.body;

        const search = await UserModel.find({
            $or: [
                {
                    $and: [
                        { name: { $regex: searchPhraze, $options: 'i' } },
                        { name: { $ne: user.name } },
                    ],
                },
                {
                    $and: [
                        { lastName: { $regex: searchPhraze, $options: 'i' } },
                        { lastName: { $ne: user.lastName } },
                    ],
                },
                {
                    $and: [
                        { email: { $regex: searchPhraze, $options: 'i' } },
                        { email: { $ne: user.email } },
                    ],
                },
            ],
        }).exec();

        if (search.length !== 0) {
            Promise.all(search).then(() => {
                const searchResult: ISearchResult[] = search.map(user => {
                    const reducerUser: ISearchResult = {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                        friendRequestStatus: null,
                    };

                    return reducerUser;
                });

                res.locals.searchResult = searchResult;
                next();
            });
        } else {
            const search = await UserModel.findOne({
                _id: searchPhraze,
            }).exec();

            if (!search) {
                return res.status(200).json({
                    message: 'No user found, that matches given credentials',
                });
            }

            const reducedUser: ISearchResult[] = [
                {
                    _id: search._id,
                    email: search.email,
                    name: search.name,
                    lastName: search.lastName,
                    friendRequestStatus: null,
                },
            ];

            res.locals.searchResult = reducedUser;
            next();
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
