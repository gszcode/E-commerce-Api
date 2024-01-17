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
exports.recoveryPassword = exports.forgotPassword = exports.verifyToken = exports.logout = exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const generateAccessToken_1 = __importDefault(require("../utils/generateAccessToken"));
const error_interface_1 = require("../interfaces/error.interface");
const generateSecureCookie_1 = require("../utils/generateSecureCookie");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            errors: result.array()[0].msg
        });
    }
    const { first_name, last_name, username, email, password } = req.body;
    try {
        let user = yield User_1.UserSchema.findOne({ where: { email } });
        if (user)
            throw new error_interface_1.CustomError('User already exists', 400);
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        user = yield User_1.UserSchema.create({
            first_name,
            last_name,
            username,
            email,
            password: passwordHash
        });
        return res.status(201).json({
            message: 'User created successfully'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.UserSchema.findOne({
            where: { email }
        });
        if (!user)
            throw new error_interface_1.CustomError('Invalid credentials', 400);
        const passwordMatch = yield bcrypt_1.default.compare(password, user.getDataValue('password'));
        if (!passwordMatch)
            throw new error_interface_1.CustomError('Invalid credentials', 400);
        const token = (0, generateAccessToken_1.default)(email, '1d');
        (0, generateSecureCookie_1.generateSecureCookie)(res, token);
        const userData = {
            username: user.getDataValue('username'),
            first_name: user.getDataValue('first_name'),
            last_name: user.getDataValue('last_name'),
            email: user.getDataValue('email')
        };
        return res.status(200).json({
            message: 'Login successful',
            user: userData,
            token
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const logout = (req, res, next) => {
    try {
        return res
            .cookie('token', '', {
            expires: new Date(0)
        })
            .sendStatus(200);
    }
    catch (error) {
        next(error);
    }
};
exports.logout = logout;
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { token } = req.cookies;
        if (!token)
            throw new error_interface_1.CustomError('Authentication token is required', 401);
        const { user } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userFound = yield User_1.UserSchema.findOne({
            where: { email: user },
            attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
        });
        return res.status(200).json({ data: userFound });
    }
    catch (error) {
        next(error);
    }
});
exports.verifyToken = verifyToken;
const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email } = req.body;
        if (!email)
            throw new error_interface_1.CustomError('Email invalido', 400);
        const user = yield User_1.UserSchema.findOne({ where: { email } });
        if (!user)
            throw new error_interface_1.CustomError('Email invalido', 400);
        const token = (0, generateAccessToken_1.default)(email, '10m');
        const verificationLink = `http://localhost:5173/recovery-password/${token}`;
        const { NODEMAILER_HOST, NODEMAILER_PORT, NODEMAILER_USER, NODEMAILER_PASS } = process.env;
        const transporter = nodemailer_1.default.createTransport({
            host: NODEMAILER_HOST,
            port: parseInt(NODEMAILER_PORT),
            auth: {
                user: process.env.NODEMAILER_USER,
                pass: process.env.NODEMAILER_PASS
            }
        });
        yield transporter.sendMail({
            from: 'imperio@shoes.com',
            to: email,
            subject: 'Recuperar Contraseña',
            html: `<a href="${verificationLink}">Desde esté link podras actualizar tu contraseña</a>`
        });
        return res.status(200).json({
            message: 'Revise su correo y verá un enlace para restablecer su contraseña.'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.forgotPassword = forgotPassword;
const recoveryPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.params;
    const { password, repassword } = req.body;
    try {
        if (!token) {
            throw new Error('Token no proporcionado');
        }
        const { user: userEmail } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!userEmail || !userEmail) {
            throw new Error('Token no válido');
        }
        if (!password || password !== repassword) {
            throw new Error('Las contraseñas no coinciden');
        }
        const user = yield User_1.UserSchema.findOne({ where: { email: userEmail } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        yield User_1.UserSchema.update({ password: passwordHash }, { where: { email: userEmail } });
        return res.status(200).json({
            message: 'Contraseña cambiada exitosamente'
        });
    }
    catch (error) {
        if (error.name === 'JsonWebTokenError' ||
            error.name === 'TokenExpiredError') {
            return res.status(400).json({ message: 'Token no válido' });
        }
        return next(error);
    }
});
exports.recoveryPassword = recoveryPassword;
