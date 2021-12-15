import { Request, Response } from 'express';
import { UserModel } from '../models/User';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import 'express-session

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

        console.log(`decodedToken: ${decodedToken}`);

        const user = await UserModel.findOne({
            _id: JSON.parse(decodedToken).id,
        }).lean();

        const returnedUser = {
            id: user?._id,
            email: user?.email,
            name: user?.name,
            lastname: user?.name,
        };

        console.log(returnedUser);

        res.status(200).json(returnedUser);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};
