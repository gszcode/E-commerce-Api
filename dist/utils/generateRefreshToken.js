"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateSecureCookie_1 = require("./generateSecureCookie");
const generateRefreshToken = (res, user) => {
    const refreshToken = jsonwebtoken_1.default.sign({ user }, process.env.REFRESH_JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 3
    });
    (0, generateSecureCookie_1.generateSecureCookie)(res, refreshToken);
};
exports.default = generateRefreshToken;
