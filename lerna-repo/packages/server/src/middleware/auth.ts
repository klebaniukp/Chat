import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'express-session';

interface IDecodedData {
    id: string;
}

export const auth = async (req: Request, res: Response) => {
    try {
        const sess = req.session;
        sess.token = req.cookies.token;
        const token = sess.token;
        let decodedToken: string | null | JwtPayload = '';

        if (process.env.JWT_SECRET_TOKEN != undefined)
            if (jwt.verify(sess.token, process.env.JWT_SECRET_TOKEN))
                decodedToken = jwt.decode(token);

        decodedToken = JSON.stringify(decodedToken);

        if (decodedToken != undefined)
            console.log(`token: ${decodedToken}, type: ${typeof decodedToken}`);

        const user = await UserModel.findOne({
            _id: JSON.parse(decodedToken).id,
        }).lean();

        console.log(`userData: ${user?.name}`);

        // const email = JSON.parse(decodedToken).email;

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
