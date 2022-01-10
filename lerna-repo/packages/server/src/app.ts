import express from 'express';
import mongoose from 'mongoose';
import redis, { createClient } from 'redis';
import nconf from 'nconf';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { userRouter } from './routes/user';

dotenv.config();

const CONNECTION_URL = process.env.CONNECTION_URL as string;
const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET as string;
const oneHour = 3600000;

const app = express();

app.set('trust proxy', 1);

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: oneHour,
            httpOnly: true,
            secure: true,
            sameSite: false,
            path: '/',
        },
    }),
);

const origin =
    process.env.NODE_ENV === 'production'
        ? process.env.CLIENT_URL
        : 'http://localhost:3000';

app.use(
    cors({
        credentials: true,
        origin,
    }),
);

app.use('/user', userRouter);

// nconf.argv().env().file('key.json');

const host = 'redis-13520.c124.us-central1-1.gce.cloud.redislabs.com';
const port = '13520';
const password = 'T2VyUJHB4rq1bKZgXnfPKHcdhrMlCC2S';

const client = createClient({
    url: 'redis://:' + password + '@' + host + ':' + port,
});

client.on('error', err => console.log('Redis Client Error', err));

mongoose
    .connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on: http://localhost:${PORT}`),
        ),
    )
    .catch(error => console.log(`${error} did not connect`));
