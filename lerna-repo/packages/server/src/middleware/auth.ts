import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import 'express-session';

interface IDecodedData {
    id: string;
}

export const auth = (req: Request, res: Response) => {
    try {
        const sess = req.session;
        sess.token = req.cookies.token;
        // sess.secret = process.env.JWT_SECRET_TOKEN as string;
        if (process.env.JWT_SECRET_TOKEN)
            jwt.verify(
                sess.token.JSON.stringify(),
                process.env.JWT_SECRET_TOKEN,
                err => {
                    if (err) {
                        res.status(401).json({ message: 'Unauthorized' });
                    } else {
                        sess.userId = decoded.id;
                        res.status(200).json({ message: 'Authorized' });
                    }
                },
            );

        console.log(`session: ${sess} token: ${sess.token}`);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
