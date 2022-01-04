import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.token;
        const secretToken = process.env.JWT_SECRET_TOKEN as string;

        if (jwt.verify(token, secretToken)) {
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
