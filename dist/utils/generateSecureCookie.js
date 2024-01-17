"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSecureCookie = void 0;
const generateSecureCookie = (res, token) => {
    const MODE = process.env.NODE_ENV === 'production';
    const cookieOptions = {
        httpOnly: MODE,
        secure: MODE
    };
    res.cookie('token', token, cookieOptions);
};
exports.generateSecureCookie = generateSecureCookie;
