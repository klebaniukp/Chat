"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordSchema = void 0;
const password_validator_1 = __importDefault(require("password-validator"));
exports.passwordSchema = new password_validator_1.default();
exports.passwordSchema
    .is()
    .min(8)
    .is()
    .max(15)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();
