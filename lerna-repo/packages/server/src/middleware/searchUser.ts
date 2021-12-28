import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUser, IResUser } from '../types/types';

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { searchPhraze } = req.body;

        const searchResult: IUser[] = await UserModel.find({
            $or: [
                { name: { $regex: searchPhraze, $options: 'i' } },
                { lastName: { $regex: searchPhraze, $options: 'i' } },
                { email: { $regex: searchPhraze, $options: 'i' } },
                { id: { $regex: searchPhraze, $options: 'i' } },
            ],
        }).exec();

        searchResult.map(user => {
            delete (user as IResUser).password;
        });

        res.status(200).json({
            searchResult: searchResult,
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
