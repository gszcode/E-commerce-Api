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
exports.registerUser = void 0;
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const request = (0, supertest_1.default)(index_1.app);
const URL_AUTH = '/api/v1/auth';
const user = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123'
};
const registerUser = () => __awaiter(void 0, void 0, void 0, function* () {
    return request.post(`${URL_AUTH}/register`).send(user);
});
exports.registerUser = registerUser;
