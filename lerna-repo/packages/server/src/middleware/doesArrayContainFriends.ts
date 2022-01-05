import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ISearchResult, IUser } from '../types/types';
import { IUserFriend } from '../types/types';

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
        // console.log(`friendList: ${friendList}`);

        const possibleFriendArray: ISearchResult[] =
            res.locals.possibleFriendArray;

        const searchResultIdsList = possibleFriendArray.map(user => user._id);

        const friendIdsList = friendList.map(user => user._id);

        // console.log(`friendIdsList: ${friendIdsList}`);
        // console.log(`searchResultIdsList: ${searchResultIdsList}`);

        for (let i = 0; i < searchResultIdsList.length; i++) {
            if (friendIdsList.includes(`${searchResultIdsList[i]}`)) {
                const friendRequestStatus = searchForFieldWithCertainId(
                    searchResultIdsList[i],
                    friendList,
                );

                console.log(`friendRequestStatus: ${friendRequestStatus}`);

                possibleFriendArray[i].friendRequestStatus =
                    friendRequestStatus;
            }
        }
        //przekraczane są indexy, friendIdsList ma np. 4 znajomych,
        //a na 5 indexie jest w searchresultIDsList jest friend

        // console.log(`possibleFriendArray: ${possibleFriendArray}`);
        possibleFriendArray.forEach(element => {
            console.log(`element: ${JSON.stringify(element)}`);
        });
        return res.status(200).json({ result: possibleFriendArray });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};

const searchForFieldWithCertainId = (
    _id: string,
    array: IUserFriend[],
): boolean | null => {
    _id = _id.toString();

    for (let i = 0; i < array.length; i++) {
        if (array[i]._id === _id) {
            const friendRequestStatus = array[i].friendRequestStatus;
            return friendRequestStatus;
        }
    }

    return null;
};
