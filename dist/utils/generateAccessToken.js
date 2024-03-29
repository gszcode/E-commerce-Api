"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user, expiresIn) => {
    const token = jsonwebtoken_1.default.sign({ user }, process.env.JWT_SECRET, {
        expiresIn
    });
    return token;
};
exports.default = generateAccessToken;
