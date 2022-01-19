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
exports.sendFriendRequest = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const friendToAddId = req.body.id;
        const token = req.cookies.token;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const user = yield User_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
        const friendToAdd = yield User_1.UserModel.findById(friendToAddId);
        if (!friendToAdd) {
            return res
                .status(404)
                .json({ message: 'User you are trying to add do not exist' });
        }
        updateUserFriendList(friendToAddId, userId, userId, false);
        updateUserFriendList(userId, userId, friendToAddId, false);
        return res.status(200).json({ message: 'Friend request sent' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.sendFriendRequest = sendFriendRequest;
const updateUserFriendList = (userId, senderId, idToUpdate, friendRequestStatus) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { _id: userId };
        const userObjectToUpdate = {
            _id: idToUpdate,
            friendRequestStatus: friendRequestStatus,
            senderId: senderId,
        };
        const update = {
            $push: { friends: userObjectToUpdate },
        };
        yield User_1.UserModel.findOneAndUpdate(filter, update);
    }
    catch (error) {
        console.log(error);
    }
});
