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
exports.auth = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const maxAge = 1000 * 60 * 60;
        const token = req.cookies.token;
        const secretToken = process.env.JWT_SECRET_TOKEN;
        if (jsonwebtoken_1.default.verify(token, secretToken)) {
            const decodedToken = jsonwebtoken_1.default.decode(token);
            const userId = decodedToken.id;
            User_1.UserModel.findOne({ _id: userId })
                .then(response => {
                if (response) {
                    const user = {
                        _id: response._id,
                        email: response.email,
                        name: response.name,
                        lastName: response.lastName,
                        friends: response.friends,
                    };
                    const token = jsonwebtoken_1.default.sign({ email: user.email, id: user._id }, secretToken, { expiresIn: '60m' });
                    res.status(200)
                        .clearCookie('token')
                        .cookie('token', token, {
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true,
                        maxAge: maxAge,
                    })
                        .json(user);
                }
            })
                .catch(error => {
                console.log(error);
            });
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
exports.auth = auth;
