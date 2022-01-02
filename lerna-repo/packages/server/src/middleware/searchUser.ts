import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUser, IFriend } from '../types/types';

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { searchPhraze } = req.body;
        const searchResult: IFriend[] = [];

        const search: IUser[] = await UserModel.find({
            $or: [
                { name: { $regex: searchPhraze, $options: 'i' } },
                { lastName: { $regex: searchPhraze, $options: 'i' } },
                { email: { $regex: searchPhraze, $options: 'i' } },
                // { _id: { $regex: searchPhraze, $options: 'i' } },
                // { _id: searchPhraze },
            ],
        }).exec();

        Promise.all(search).then(() => {
            search.map(user => {
                const reducedUser: IFriend = {
                    email: user.email,
                    name: user.name,
                    lastName: user.lastName,
                };

                searchResult.push(reducedUser);
            });

            res.status(200).json({
                searchResult: searchResult,
            });
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
