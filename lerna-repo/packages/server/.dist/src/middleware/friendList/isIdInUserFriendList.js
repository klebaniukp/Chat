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
exports.isIdInUserFriendList = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const isIdInUserFriendList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const { friendId } = req.body;
        const user = yield User_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
        const friendList = {};
        for (let i = 0; i < user.friends.length; i++) {
            friendList[user.friends[i]._id] = {
                _id: user.friends[i]._id,
                friendRequestStatus: user.friends[i].friendRequestStatus,
                senderId: user.friends[i].senderId,
            };
        }
        if (friendList[friendId]) {
            res.locals.user = user;
            next();
        }
        else {
            return res
                .status(201)
                .json({ message: 'User is not on your friendList' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.isIdInUserFriendList = isIdInUserFriendList;
