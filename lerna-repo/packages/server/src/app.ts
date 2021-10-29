import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { userRouter } from './routes/user';

const app = express();
const port = 5000;

dotenv.config();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
// app.use(cookieParser());

app.use('/user', userRouter);
// app.use('/', userRouter);

// const origin =
//     process.env.NODE_ENV === 'production'
//         ? process.env.CLIENT_URL
//         : 'http://localhost:5000';

// app.use(
//     cors({
//         credentials: true,
//         origin,
//     }),
// );

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
