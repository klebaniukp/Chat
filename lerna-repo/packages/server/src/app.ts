import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { userRouter } from './routes/user';

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL as string;
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

app.use('/user', userRouter);4

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on: http://localhost:${PORT}`),
        ),
    )
    .catch(error => console.log(`${error} did not connect`));
