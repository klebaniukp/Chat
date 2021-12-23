import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUser, IResUser } from '../types/types';

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { searchPhraze } = req.body;

        console.log(searchPhraze);

        // const searchResult: IUser[] = [];

        // const userByName = await UserModel.find({
        //     name: { $regex: searchPhraze, $options: 'i' },
        // }).exec();

        // const userByLastName = await UserModel.find({
        //     lastName: { $regex: searchPhraze, $options: 'i' },
        // }).exec();

        const searchResult: IUser[] = await UserModel.find({
            $or: [
                { name: { $regex: searchPhraze, $options: 'i' } },
                { lastName: { $regex: searchPhraze, $options: 'i' } },
            ],
        }).exec();

        // userByName.map(user => {
        //     delete (user as IResUser).password;

        //     if (!searchResult.includes(user)) searchResult.push(user);
        // });

        // userByLastName.map(user => {
        //     delete (user as IResUser).password;

        //     if (!searchResult.includes(user)) searchResult.push(user);
        // });

        console.log(`searchResult: ${searchResult}`);

        res.status(200).json({
            searchResult: searchResult,
        });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
