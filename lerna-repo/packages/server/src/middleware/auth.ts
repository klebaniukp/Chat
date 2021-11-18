import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'express-session';

interface IDecodedData {
    id: string;
}

export const auth = (req: Request, res: Response) => {
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

        res.status(200).send(decodedToken);

        // console.log(typeof process.env.JWT_SECRET_TOKEN);
        // console.log(typeof sess.token);
        // console.log(`token: ${sess.token}, typ: ${typeof (sess.token)}`)
        // console.log(`session: ${sess} token: ${sess.token}`);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }
};

//error w przegladarce: 'cannot read property of undefined (reading 'stringify')

// ^ message w jsonie
