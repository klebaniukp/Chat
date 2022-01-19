import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authentication = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.cookies.token;
        const secretToken = process.env.JWT_SECRET_TOKEN as string;

        // console.log(jwt.decode(token) as JwtPayload);

        if (jwt.verify(token, secretToken)) {
            res.locals.userId = (jwt.decode(token) as JwtPayload).id;
            next();
        } else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
