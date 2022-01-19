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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const user_1 = require("./routes/user");
const client_1 = require("./redis/client");
dotenv_1.default.config();
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
const SESSION_SECRET = process.env.SESSION_SECRET;
const oneHour = 3600000;
const app = (0, express_1.default)();
app.set('trust proxy', 1);
app.use(express_1.default.json({ limit: '30mb' }));
app.use(express_1.default.urlencoded({ limit: '30mb', extended: true }));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
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
}));
const origin = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL
    : 'http://localhost:3000';
app.use((0, cors_1.default)({
    credentials: true,
    origin,
}));
app.use('/user', user_1.userRouter);
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        credentials: true,
        origin,
    },
});
io.on('connection', (socket) => {
    socket.on('send message', (message, senderId, recieverId) => __awaiter(void 0, void 0, void 0, function* () {
        const key1 = `${senderId}:${recieverId}`;
        const key2 = `${recieverId}:${senderId}`;
        const conversation1 = yield client_1.client.lRange(key1, 0, -1);
        const redisPayload = '{"message": "' +
            message +
            '", "senderId":' +
            '"' +
            senderId +
            '"' +
            '}';
        if (conversation1.length === 0) {
            yield client_1.client.lPush(key2, redisPayload);
        }
        else {
            yield client_1.client.lPush(key1, redisPayload);
        }
        io.emit(`${senderId}:${recieverId}`, {
            message: message,
            senderId: senderId,
        });
        io.emit(`${recieverId}:${senderId}`, {
            message: message,
            senderId: senderId,
        });
    }));
});
mongoose_1.default
    .connect(CONNECTION_URL)
    .then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server Running on: http://localhost:${PORT}`);
        (() => __awaiter(void 0, void 0, void 0, function* () {
            yield client_1.client.connect();
            client_1.client.on('error', err => console.log('Redis Client Error', err));
            const value = yield client_1.client.LRANGE('messages', 0, -1);
            // console.log(JSON.parse(value[0]));
            // console.log(JSON.parse(value[1]));
        }))();
    });
})
    .catch(error => console.log(`${error} did not connect`));
