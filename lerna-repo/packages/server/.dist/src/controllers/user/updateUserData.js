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
exports.updateUserData = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, lastname } = req.body;
        const token = req.cookies.token;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const filter = { _id: userId };
        const update = {
            email: email,
            name: name,
            lastName: lastname,
        };
        const takenData = yield User_1.UserModel.findOne({ email: email }).exec();
        const userCheck = yield User_1.UserModel.findOne(filter).exec();
        if (!userCheck) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
        if (takenData && userCheck.email !== email) {
            return res
                .status(201)
                .json({ message: 'This email address is already taken' });
        }
        yield User_1.UserModel.findOneAndUpdate(filter, update);
        const user = yield User_1.UserModel.find(filter).exec();
        Promise.all(user).then(() => {
            if (user.length === 1) {
                const convertedUser = {
                    email: user[0].email,
                    name: user[0].name,
                    lastName: user[0].lastName,
                };
                res.status(200).json({
                    result: convertedUser,
                    message: 'User data updated',
                });
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.updateUserData = updateUserData;
