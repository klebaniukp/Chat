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
            ],
        }).exec();

        if (search.length !== 0) {
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
        } else {
            const search = await UserModel.findOne({
                _id: searchPhraze,
            }).exec();

            if (!search) {
                return res.status(200).json({ message: 'No user found' });
            }

            const reducedUser = [
                {
                    email: search.email,
                    name: search.name,
                    lastName: search.lastName,
                },
            ];

            return res.status(200).json({ searchResult: reducedUser });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
