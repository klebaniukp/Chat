import { Request, Response } from 'express';
import { UserModel } from '../../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateFriendList = async (req: Request, res: Response) => {
    try {
        const token = req.cookies.token;

        if (jwt.decode(token) === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decodedToken = jwt.decode(token) as JwtPayload;
        const userId = decodedToken.id;

        const filter = { _id: userId };
        const user = await UserModel.findOne(filter);

        if (!user) {
            return res
                .status(404)
                .json({ message: 'Invalid jwt token, user not found' });
        }

        const friendList = user.friends.map(friend => {
            return {
                friendRequestStatus: friend.friendRequestStatus,
            };
        });

        const idsFriendList = user.friends.map(friend => friend._id);

        if (friendList.length === 0) {
            return res.status(200).json({
                message: 'No friends',
                friendList: [
                    { email: 'Forever', name: 'Your', lastname: 'Friend' },
                ],
            });
        }

        const filledFriendList = UserModel.find({
            _id: { $in: idsFriendList },
        });

        filledFriendList
            .then(users => {
                const convertedUsersList = [];

                for (let i = 0; i < users.length; i++) {
                    const user = {
                        email: users[i].email,
                        name: users[i].name,
                        lastName: users[i].lastName,
                        friendRequestStatus: friendList[i].friendRequestStatus,
                    };

                    convertedUsersList.push(user);
                }
                return res.status(200).json({ friendList: convertedUsersList });
            })
            .catch(err => {
                return res
                    .status(500)
                    .json({ message: (err as Error).message });
            });
    } catch (err) {
        res.status(501).json({ message: (err as Error).message });
    }
};
