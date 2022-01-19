"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const host = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT;
const password = process.env.REDIS_PASSWORD;
exports.client = (0, redis_1.createClient)({
    url: 'redis://:' + password + '@' + host + ':' + redisPort,
});
