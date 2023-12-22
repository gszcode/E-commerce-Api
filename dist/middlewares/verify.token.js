"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        let token = req.headers['authorization'];
        if (!token) {
            return res
                .status(401)
                .json({ message: 'Authentication token is required' });
        }
        token = token.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === 'string')
            req.email = decoded;
        else
            req.email = decoded.user;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
};
exports.verifyToken = verifyToken;
