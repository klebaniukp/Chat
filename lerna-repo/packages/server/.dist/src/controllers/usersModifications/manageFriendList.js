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
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFriend = exports.manageFriendRequest = void 0;
const User_1 = require("../../models/User");
const updateFriendList = (_id, friendList) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = {
            _id: _id,
        };
        const update = {
            friends: friendList,
        };
        yield User_1.UserModel.findOneAndUpdate(filter, update);
        return true;
    }
    catch (error) { }
});
const manageFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friendId, finalStatus } = req.body;
        const user = res.locals.user;
        const friend = yield User_1.UserModel.findById(friendId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
        if (!friend) {
            return res.status(404).json({ message: 'Friend not found' });
        }
        const userFriendList = createObjectWithFieldsFromArray(user.friends);
        const friendFriendList = createObjectWithFieldsFromArray(friend.friends);
        if (finalStatus) {
            const result = acceptFriendRequest(user._id, friend._id, userFriendList, friendFriendList);
            if (!result) {
                return res.status(201).json({
                    message: 'Something went wrong, maybe user is already part of your friendList',
                });
            }
            else {
                res.status(200).json({ message: 'Friend request accepted' });
            }
        }
        else if (!finalStatus) {
            const result = rejectFriendRequest(user._id, friend._id, userFriendList, friendFriendList);
            if (!result) {
                return res.status(201).json({
                    message: 'Something went wrong, maybe user is already deleted from your friendList',
                });
            }
            else {
                res.status(200).json({ message: 'Friend request rejected' });
            }
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.manageFriendRequest = manageFriendRequest;
const acceptFriendRequest = (userId, friendId, userFriendList, friendFriendlist) => __awaiter(void 0, void 0, void 0, function* () {
    userFriendList[friendId] = {
        _id: friendId,
        friendRequestStatus: true,
        senderId: userFriendList[friendId].senderId,
    };
    friendFriendlist[userId] = {
        _id: userId,
        friendRequestStatus: true,
        senderId: friendFriendlist[userId].senderId,
    };
    if ((yield updateFriendList(userId, Object.values(userFriendList))) &&
        (yield updateFriendList(friendId, Object.values(friendFriendlist)))) {
        return true;
    }
    else {
        return false;
    }
});
const rejectFriendRequest = (userId, friendId, userFriendList, friendFriendlist) => __awaiter(void 0, void 0, void 0, function* () {
    delete userFriendList[friendId];
    delete friendFriendlist[userId];
    if ((yield updateFriendList(userId, Object.values(userFriendList))) &&
        (yield updateFriendList(friendId, Object.values(friendFriendlist)))) {
        return true;
    }
    else {
        return false;
    }
});
const createObjectWithFieldsFromArray = (array) => {
    const object = {};
    for (let i = 0; i < array.length; i++) {
        object[array[i]._id] = {
            _id: array[i]._id,
            friendRequestStatus: array[i].friendRequestStatus,
            senderId: array[i].senderId,
        };
    }
    return object;
};
const removeFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { friendId } = req.body;
        const user = res.locals.user;
        const friend = yield User_1.UserModel.findById(friendId);
        if (!user) {
            return res.status(404).json({ message: 'Unauthorized' });
        }
        if (!friend) {
            return res.status(404).json({
                message: 'User you are trying to delete do not exist',
            });
        }
        const userFriendList = createObjectWithFieldsFromArray(user.friends);
        const friendFriendList = createObjectWithFieldsFromArray(friend.friends);
        delete userFriendList[friendId];
        delete friendFriendList[user._id];
        if ((yield updateFriendList(user._id, Object.values(userFriendList))) &&
            (yield updateFriendList(friend._id, Object.values(friendFriendList)))) {
            return res.status(200).json({ message: 'Friend removed' });
        }
        else {
            return res.status(500).json({
                message: 'Something went wrong, maybe user is already removed',
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.removeFriend = removeFriend;
