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
exports.account = void 0;
const User_1 = require("../models/User");
const account = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.UserSchema.findOne({
            where: { email: req['email'] },
            attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
        });
        if (!user)
            throw new Error('User does not exist');
        return res.status(200).json({ data: user });
    }
    catch (error) {
        next(error);
    }
});
exports.account = account;
