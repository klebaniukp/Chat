import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import { IUserFriend } from '../types/types';
import jwt from 'jsonwebtoken';

interface IUser {
    _id: string;
    email: string;
    name: string;
    lastName: string;
    friends: IUserFriend[];
}

export const auth = async (req: Request, res: Response) => {
    try {
        const maxAge = 1000 * 60 * 60;
        const token = req.cookies.token;
        const secretToken = process.env.JWT_SECRET_TOKEN as string;

        if (jwt.verify(token, secretToken)) {
            const decodedToken = JSON.stringify(jwt.decode(token));
            const userId = JSON.parse(decodedToken).id;

            // console.log(`decodedToken: ${decodedToken}`);

            UserModel.findOne({ _id: userId })
                .then(response => {
                    if (response) {
                        const user: IUser = {
                            _id: response._id,
                            email: response.email,
                            name: response.name,
                            lastName: response.lastName, 
                            friends: response.friends,
                        };

                        const token = jwt.sign(
                            { email: user.email, id: user._id },
                            secretToken,
                            { expiresIn: '60m' },
                        );

                        res.status(200)
                            .clearCookie('token')
                            .cookie('token', token, {
                                httpOnly: true,
                                sameSite: 'none',
                                secure: true,
                                maxAge: maxAge,
                            })
                            .json(user);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
