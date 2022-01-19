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
exports.generateFriendList = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateFriendList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        if (jsonwebtoken_1.default.decode(token) === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const filter = { _id: userId };
        const user = yield User_1.UserModel.findOne(filter);
        if (!user) {
            return res
                .status(404)
                .json({ message: 'Invalid jwt token, user not found' });
        }
        const friendList = {};
        for (let i = 0; i < user.friends.length; i++) {
            friendList[user.friends[i]._id] = {
                _id: user.friends[i]._id,
                friendRequestStatus: user.friends[i].friendRequestStatus,
                senderId: user.friends[i].senderId,
            };
        }
        const idsFriendList = user.friends.map(friend => friend._id);
        if (Object.keys(friendList).length === 0) {
            return res.status(200).json({
                message: 'No friends',
                friendList: [
                    { email: 'Forever', name: 'Your', lastname: 'Friend' },
                ],
            });
        }
        const filledFriendList = User_1.UserModel.find({
            _id: { $in: idsFriendList },
        });
        filledFriendList
            .then(users => {
            const convertedUsersList = [];
            for (let i = 0; i < users.length; i++) {
                const user = {
                    _id: users[i]._id,
                    email: users[i].email,
                    name: users[i].name,
                    lastName: users[i].lastName,
                    friendRequestStatus: friendList[users[i]._id].friendRequestStatus,
                    senderId: friendList[users[i]._id].senderId,
                };
                convertedUsersList.push(user);
            }
            return res.status(200).json({ friendList: convertedUsersList });
        })
            .catch(err => {
            return res
                .status(500)
                .json({ message: err.message });
        });
    }
    catch (err) {
        res.status(501).json({ message: err.message });
    }
});
exports.generateFriendList = generateFriendList;
