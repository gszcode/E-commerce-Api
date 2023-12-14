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
exports.login = exports.register = void 0;
const User_schema_1 = require("../models/User.schema");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, username, email, password } = req.body;
    try {
        let user = yield User_schema_1.UserSchema.findOne({ where: { email } });
        if (user)
            throw new Error('User already exists');
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        user = yield User_schema_1.UserSchema.create({
            first_name,
            last_name,
            username,
            email,
            password: passwordHash
        });
        return res.status(201).json({
            message: 'User created successfully',
            data: user
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
        const user = yield User_schema_1.UserSchema.findOne({
            where: { email }
        });
        if (!user)
            throw new Error('Invalid credentials');
        const passwordMatch = yield bcrypt_1.default.compare(password, user.getDataValue('password'));
        if (!passwordMatch)
            throw new Error('Invalid password');
        return res.status(200).json({
            message: 'Login successful'
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
