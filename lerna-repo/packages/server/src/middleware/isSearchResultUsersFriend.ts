import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ISearchResult } from '../types/types';

export const isSearchResultUsersFriend = async (
    req: Request,
    res: Response,
) => {
    try {
        const token = req.cookies.token;
        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }

        const friendList = user.friends;

        const searchResult: ISearchResult[] = res.locals.searchResult;

        const searchResultIdsList = searchResult.map(user => user._id);

        const friendIdsList = friendList.map(user => user._id);

        console.log(friendIdsList);
        console.log(searchResultIdsList);

        for (let i = 0; i < searchResultIdsList.length; i++) {
            console.log(searchResultIdsList[i]);
            if (friendIdsList.includes(`${searchResultIdsList[i]}`)) {
                console.log('includes');
                console.log(
                    `friendIdsList[${i}]: ${friendIdsList[i]}, searchResultIdsList[${i}]: ${searchResultIdsList[i]}`,
                );
                searchResult[i].friendRequestStatus =
                    friendList[i].friendRequestStatus;
            }
        }

        return res.status(200).json({ searchResult: searchResult });
    } catch (error) {
        return res.status(500).json({ message: (error as Error).message });
    }
};
