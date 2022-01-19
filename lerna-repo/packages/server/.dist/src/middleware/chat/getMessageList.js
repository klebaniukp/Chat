"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageList = void 0;
const client_1 = require("../../redis/client");
const getMessageList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    const { friendId } = req.body;
    const key = `${userId}:${friendId}`;
    const key2 = `${friendId}:${userId}`;
    const messages = yield client_1.client.LRANGE(key, 0, -1);
    const messages2 = yield client_1.client.LRANGE(key2, 0, -1);
    if (messages.length === 0 && messages2.length === 0) {
        const sampleMessage = '{"message": "hi", "senderId":' + '"' + userId + '"' + '}';
        yield client_1.client.LPUSH(key, sampleMessage);
        const updatedMessages = yield client_1.client.LRANGE(key, 0, -1);
        return res.status(200).json({ messages: updatedMessages });
    }
    else {
        if (messages.length === 0) {
            return res.status(200).json({ messages: messages2 });
        }
        else {
            return res.status(200).json({ messages: messages });
        }
    }
});
exports.getMessageList = getMessageList;
