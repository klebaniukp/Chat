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
exports.isUserMyFriend = exports.signin = exports.signup = void 0;
const User_1 = require("../../models/User");
const Password_1 = require("../../models/Password");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateId = () => {
    const randomString = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return `${randomString()}-${randomString()}-${randomString()}-${randomString()}-${randomString()}-${randomString()}${randomString()}${randomString()}`;
};
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET_TOKEN;
    const refreshToken = process.env.JWT_REFRESH_TOKEN;
    const specialSigns = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const { email, name, lastName, password } = req.body;
    const maxAge = 1000 * 60 * 60;
    try {
        const oldUser = yield User_1.UserModel.findOne({ email: email });
        if (oldUser)
            return res
                .status(400)
                .json({ message: 'This email is already in use' });
        if (!Password_1.passwordSchema.validate(password))
            return res.status(400).json({
                message: 'Invalid password, check length, capital letters and number appearance',
            });
        if (!specialSigns.test(password))
            return res.status(400).json({
                message: 'Invalid password, provide special sign',
            });
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        for (let i = 0; i <= 1; i++) {
            const id = generateId().toString();
            const user = yield User_1.UserModel.findOne({ _id: id });
            if (!user) {
                const defaultFriend = yield User_1.UserModel.findOne({
                    email: 'default@friend.com',
                });
                if (!defaultFriend) {
                    return res.status(500).json({
                        message: 'Default friend not found, probably connection issue',
                    });
                }
                const friendObj = {
                    _id: defaultFriend._id,
                    friendRequestStatus: true,
                    senderId: defaultFriend._id,
                };
                const newUser = yield User_1.UserModel.create({
                    _id: id,
                    email: email,
                    name: name,
                    lastName: lastName,
                    password: hashedPassword,
                    friends: [friendObj],
                });
                const newUserObjectToUpdate = {
                    _id: newUser._id,
                    friendRequestStatus: true,
                    senderId: friendObj._id,
                };
                yield User_1.UserModel.findOneAndUpdate({ email: 'default@friend.com' }, { $push: { friends: newUserObjectToUpdate } });
                const token = jsonwebtoken_1.default.sign({ email: newUser.email, id: newUser._id }, secret, { expiresIn: '60m' });
                User_1.UserModel.findOne({ email: newUser.email })
                    .then(response => {
                    if (response) {
                        const result = {
                            _id: response._id,
                            email: response.email,
                            name: response.name,
                            lastName: response.lastName,
                            friends: response.friends,
                        };
                        return res
                            .status(200)
                            .clearCookie('token')
                            .cookie('token', token, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                            .cookie('refreshToken', refreshToken, {
                            httpOnly: true,
                            sameSite: 'none',
                            secure: true,
                            maxAge: maxAge,
                        })
                            .json({ result });
                    }
                })
                    .catch(error => {
                    console.log(error);
                });
                break;
            }
            else {
                break;
            }
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const secret = process.env.JWT_SECRET_TOKEN;
    const refreshToken = process.env.JWT_REFRESH_TOKEN;
    const { email, password } = req.body;
    const maxAge = 1000 * 60 * 60;
    try {
        const oldUser = yield User_1.UserModel.findOne({ email: email });
        if (!oldUser)
            return res.status(404).json({ message: 'User not found' });
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, oldUser.password);
        if (!isPasswordCorrect)
            return res.status(400).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '60m' });
        User_1.UserModel.findOne({ email: email })
            .then(response => {
            if (response) {
                const user = {
                    _id: response._id,
                    email: response.email,
                    name: response.name,
                    lastName: response.lastName,
                    friends: response.friends,
                };
                return res
                    .status(200)
                    .clearCookie('token')
                    .cookie('token', token, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: maxAge,
                })
                    .cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                    maxAge: maxAge,
                })
                    .json({ result: user, message: 'Logged in' });
            }
        })
            .catch(error => {
            console.log(error);
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.signin = signin;
const isUserMyFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { possibleFriendEmail } = req.body;
        const token = req.cookies.token;
        if (jsonwebtoken_1.default.decode(token) === null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const user = yield User_1.UserModel.findById(userId);
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
exports.isUserMyFriend = isUserMyFriend;
