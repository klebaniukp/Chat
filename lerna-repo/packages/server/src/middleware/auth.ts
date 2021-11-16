import { Request, Response, NextFunction } from 'express';
import 'express-session';

export const auth = (req: Request, res: Response) => {
    try {
        const sess = req.session;
        sess.token = req.cookies.token;

        console.log(`session: ${sess} token: ${sess.token}`);

        res.status(200).json({ message: 'Hello World' });
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
