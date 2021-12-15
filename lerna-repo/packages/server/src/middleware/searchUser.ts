import { Request, Response } from 'express';
import { UserModel } from '../models/User';

export const searchUser = async (req: Request, res: Response) => {
    try {
        const { searchPhraze } = req.body;
        //frontend form has to have name on form field: searchphraze

        const userByName = await UserModel.findOne({
            name: searchPhraze,
        }).lean();

        const userByLastName = await UserModel.findOne({
            lastName: searchPhraze,
        }).lean();

        const searchResult = {
            userByName,
            userByLastName,
        };

        res.status(200).json(searchResult);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
