import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IDecodedData } from '../interfaces';

const auth = async (req: Request, res: Response) => {
    try {
    } catch (err) {
        res.json({ message: (err as any).message });
    }
};
