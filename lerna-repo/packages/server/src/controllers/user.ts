import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import '../interfaces/IUser';

const users: IUser[] = [];

export const signup = async (req: Request, res: Response) => {
    const { email, name, password } = req.body;
    try {
        // const hashedPassword = await bcrypt.hash(password, 10);

        const user = { email, name, password };

        console.log(req.body.email);

        users.push(user);
        res.status(201).send('registered');
    } catch (err) {
        res.status(500).json({ message: (err as any).message });
    }
};

// export const signin = async (req: Request, res: Response) => {
//     const user = users.find(user => user.name === req.body.name);
//     try {
//     } catch (err) {
//         res.send(500).json({ message: 'something went wrong' });
//     }
//     if (user != undefined) {
//         const isPasswordCorrect: boolean = bcrypt.compare(
//             req.body.password,
//             user.password,
//         );
//     }
// };

export const helloWorld = (req: Request, res: Response) => {
    res.send('hello world - custom');
};

export const testRegister = (req: Request, res: Response) => {
    res.json(users);
};
