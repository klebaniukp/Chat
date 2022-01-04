import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ISearchResult } from '../types/types';

export const doesArrayContainFriends = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        const friendList = user.friends;

        const possibleFriendArray: ISearchResult[] =
            res.locals.possibleFriendArray;

        const searchResultIdsList = possibleFriendArray.map(user => user._id);

        const friendIdsList = friendList.map(user => user._id);

        for (let i = 0; i < searchResultIdsList.length; i++) {
            console.log(searchResultIdsList[i]);
            if (friendIdsList.includes(`${searchResultIdsList[i]}`)) {
                possibleFriendArray[i].friendRequestStatus =
                    friendList[i].friendRequestStatus;
            }
        }

        return res.status(200).json({ result: possibleFriendArray });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
