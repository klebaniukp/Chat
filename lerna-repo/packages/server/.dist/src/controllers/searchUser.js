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
exports.searchUser = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const searchUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const user = yield User_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
        const { searchPhraze } = req.body;
        const search = yield User_1.UserModel.find({
            $or: [
                {
                    $and: [
                        { name: { $regex: searchPhraze, $options: 'i' } },
                        { name: { $ne: user.name } },
                    ],
                },
                {
                    $and: [
                        { lastName: { $regex: searchPhraze, $options: 'i' } },
                        { lastName: { $ne: user.lastName } },
                    ],
                },
                {
                    $and: [
                        { email: { $regex: searchPhraze, $options: 'i' } },
                        { email: { $ne: user.email } },
                    ],
                },
            ],
        }).exec();
        if (search.length !== 0) {
            Promise.all(search).then(() => {
                const searchResult = search.map(user => {
                    const reducerUser = {
                        _id: user._id,
                        email: user.email,
                        name: user.name,
                        lastName: user.lastName,
                        friendRequestStatus: null,
                    };
                    return reducerUser;
                });
                res.locals.possibleFriendArray = searchResult;
                next();
            });
        }
        else {
            const search = yield User_1.UserModel.findOne({
                _id: searchPhraze,
            }).exec();
            if (!search) {
                return res.status(200).json({
                    message: 'No user found, that matches given credentials',
                });
            }
            const reducedUser = [
                {
                    _id: search._id,
                    email: search.email,
                    name: search.name,
                    lastName: search.lastName,
                    friendRequestStatus: null,
                },
            ];
            res.locals.possibleFriendArray = reducedUser;
            next();
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.searchUser = searchUser;
