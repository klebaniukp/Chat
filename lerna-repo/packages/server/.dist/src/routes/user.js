"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user/user");
const logout_1 = require("../controllers/user/logout");
const auth_1 = require("../middleware/auth/auth");
const searchUser_1 = require("../controllers/searchUser");
const sendFriendRequest_1 = require("../controllers/usersModifications/sendFriendRequest");
const doesArrayContainFriends_1 = require("../middleware/friendList/doesArrayContainFriends");
const updateUserData_1 = require("../controllers/user/updateUserData");
const authentication_1 = require("../middleware/auth/authentication");
const generateFriendList_1 = require("../controllers/user/generateFriendList");
const manageFriendList_1 = require("../controllers/usersModifications/manageFriendList");
const isIdInUserFriendList_1 = require("../middleware/friendList/isIdInUserFriendList");
const manageFriendList_2 = require("../controllers/usersModifications/manageFriendList");
const getMessageList_1 = require("../middleware/chat/getMessageList");
exports.userRouter = express_1.default.Router();
exports.userRouter.use(express_1.default.json());
exports.userRouter.post('/signin', user_1.signin);
exports.userRouter.post('/signup', user_1.signup);
exports.userRouter.get('/getUser', auth_1.auth);
exports.userRouter.post('/searchUser', authentication_1.authentication, searchUser_1.searchUser, doesArrayContainFriends_1.doesArrayContainFriends);
exports.userRouter.post('/updateUser', authentication_1.authentication, updateUserData_1.updateUserData);
exports.userRouter.get('/generateFriendList', authentication_1.authentication, generateFriendList_1.generateFriendList);
exports.userRouter.get('/logout', logout_1.logout);
exports.userRouter.post('/sendFriendRequest', authentication_1.authentication, sendFriendRequest_1.sendFriendRequest);
exports.userRouter.post('/manageFriendRequest', authentication_1.authentication, isIdInUserFriendList_1.isIdInUserFriendList, manageFriendList_1.manageFriendRequest);
exports.userRouter.post('/removeFriend', authentication_1.authentication, isIdInUserFriendList_1.isIdInUserFriendList, manageFriendList_2.removeFriend);
exports.userRouter.post('/getMessageList', authentication_1.authentication, isIdInUserFriendList_1.isIdInUserFriendList, getMessageList_1.getMessageList);
// userRouter.post('deleteFriend', authentication, deleteFriend);
//authentication - check if token is valid and if so cast next()
//auth - check if token is valid & if so generate new token & return user data from old token
