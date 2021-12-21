import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';
import { IResUser } from '../types/types';
import { IUser } from '../interfaces/IUser';

export const auth = async (req: Request, res: Response) => {
    try {
        const maxAge = 1000 * 60 * 60;
        const token = req.cookies.token;
        const secretToken = process.env.JWT_SECRET_TOKEN as string;

        if (jwt.verify(token, secretToken)) {
            const decodedToken = JSON.stringify(jwt.decode(token));

            console.log(`decodedToken: ${decodedToken}`);

            const user: IUser = await UserModel.findOne({
                _id: JSON.parse(decodedToken).id,
            }).lean();

            delete (user as IResUser).password;

            const newToken = jwt.sign(
                { email: user.email, id: user._id },
                secretToken,
                { expiresIn: '60m' },
            );

            res.status(200)
                .clearCookie('token')
                .cookie('token', newToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: maxAge,
                })
                .json(user);
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
