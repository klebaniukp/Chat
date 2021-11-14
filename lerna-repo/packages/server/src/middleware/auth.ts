import { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

interface IDecodedToken {
    id: string;
}

export const auth = (req: Request, res: Response) => {
    res.cookie('token', 'secret').json({
        message: 'cookies saved succsesfully',
    });
};
