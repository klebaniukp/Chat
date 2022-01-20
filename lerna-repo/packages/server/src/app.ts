import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { userRouter } from './routes/user';
import { client as redisClient } from './redis/client';

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

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        credentials: true,
        origin,
    },
});

io.on('connection', (socket: any) => {
    socket.on(
        'send message',
        async (message: string, senderId: string, recieverId: string) => {
            const key1 = `${senderId}:${recieverId}`;
            const key2 = `${recieverId}:${senderId}`;

            const conversation1 = await redisClient.lRange(key1, 0, -1);

            const redisPayload =
                '{"message": "' +
                message +
                '", "senderId":' +
                '"' +
                senderId +
                '"' +
                '}';

            if (conversation1.length === 0) {
                await redisClient.lPush(key2, redisPayload);
            } else {
                await redisClient.lPush(key1, redisPayload);
            }

            io.emit(`${senderId}:${recieverId}`, {
                message: message,
                senderId: senderId,
            });
            io.emit(`${recieverId}:${senderId}`, {
                message: message,
                senderId: senderId,
            });
        },
    );
});

mongoose
    .connect(CONNECTION_URL)
    .then(() => {
        httpServer.listen(PORT, () => {
            console.log(`Server Running on: http://localhost:${PORT}`);
            (async () => {
                await redisClient.connect();

                redisClient.on('error', err =>
                    console.log('Redis Client Error', err),
                );
            })();
        });
    })
    .catch(error => console.log(`${error} did not connect`));
