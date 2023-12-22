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
const index_1 = require("../index");
const db_1 = require("../db");
const registerUser_1 = require("./utils/registerUser");
const loginUser_1 = require("./utils/loginUser");
describe('User Register', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
    }));
    test('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, registerUser_1.registerUser)();
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    }));
    test('should not register a user existent', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, registerUser_1.registerUser)();
        const response = yield (0, registerUser_1.registerUser)();
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
        expect(response.body.data).toBe(null);
    }));
});
describe('User Login', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
        yield (0, registerUser_1.registerUser)();
    }));
    test('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, loginUser_1.loginUser)('john.doe@example.com', 'password123');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body).toHaveProperty('token');
    }));
    test('should not login a user with wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, loginUser_1.loginUser)('xxx@xxx.com', 'xxxxxxxx');
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credentials');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.close();
    index_1.server.close();
}));
