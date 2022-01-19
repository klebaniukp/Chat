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
exports.doesArrayContainFriends = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const doesArrayContainFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.token;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const user = yield User_1.UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
        const friendList = user.friends;
        const possibleFriendArray = res.locals.possibleFriendArray;
        const searchResultIdsList = possibleFriendArray.map(user => user._id);
        const friendIdsList = friendList.map(user => user._id);
        for (let i = 0; i < searchResultIdsList.length; i++) {
            if (friendIdsList.includes(`${searchResultIdsList[i]}`)) {
                const friendRequestStatus = searchForFieldWithCertainId(searchResultIdsList[i], friendList);
                possibleFriendArray[i].friendRequestStatus =
                    friendRequestStatus;
            }
        }
        return res.status(200).json({ result: possibleFriendArray });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
});
exports.doesArrayContainFriends = doesArrayContainFriends;
const searchForFieldWithCertainId = (_id, array) => {
    _id = _id.toString();
    for (let i = 0; i < array.length; i++) {
        if (array[i]._id === _id) {
            const friendRequestStatus = array[i].friendRequestStatus;
            return friendRequestStatus;
        }
    }
    return null;
};
