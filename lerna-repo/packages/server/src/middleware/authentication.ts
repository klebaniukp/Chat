import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const maxAge = 1000 * 60 * 60;
        const token = req.cookies.token;
        const secretToken = process.env.JWT_SECRET_TOKEN as string;

        if (jwt.verify(token, secretToken)) {
            // res.status(200).clearCookie('token').cookie('token', token, {
            //     httpOnly: true,
            //     sameSite: 'none',
            //     secure: true,
            //     maxAge: maxAge,
            // });
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
