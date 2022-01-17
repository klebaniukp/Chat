import { Request, Response } from 'express';
import { client as RedisClient } from '../../redis/client';

export const getMessageList = async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const { friendId } = req.body;

    const key = `${userId}:${friendId}`;
    const key2 = `${friendId}:${userId}`;

    const messages = await RedisClient.LRANGE(key, 0, -1);
    const messages2 = await RedisClient.LRANGE(key2, 0, -1);

    if (messages.length === 0 && messages2.length === 0) {
        const sampleMessage =
            '{"message": "hi", "senderId":' + '"' + userId + '"' + '}';
        await RedisClient.LPUSH(key, sampleMessage);

        const updatedMessages = await RedisClient.LRANGE(key, 0, -1);

        return res.status(200).json({ messages: updatedMessages });
    } else {
        if (messages.length === 0) {
            return res.status(200).json({ messages: messages2 });
        } else {
            return res.status(200).json({ messages: messages });
        }
    }
};
