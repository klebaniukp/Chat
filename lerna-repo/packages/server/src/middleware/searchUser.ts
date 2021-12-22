import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IResUser } from '../types/types';

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { searchPhraze } = req.body;

        console.log(searchPhraze);

        const userByName = await UserModel.find({
            name: searchPhraze,
        }).exec();

        const userByLastName = await UserModel.find({
            lastName: searchPhraze,
        }).exec();

        console.log(`userByName: ${userByName}`);

        console.log(`userByLastName: ${userByLastName}`);

        if (userByName !== null) {
            // delete (userByName as IResUser).password;
            console.log('returning userbyname');
            res.status(200).json({
                searchResult: userByName,
            });
        } else if (userByLastName !== null) {
            // delete (userByLastName as IResUser).password;
            console.log('returning userbylastname');
            res.status(200).json({
                searchResult: userByLastName,
            });
        } else {
            res.status(400).json({ message: 'No user found' });
        }
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
