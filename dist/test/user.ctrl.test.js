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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../index");
const db_1 = require("../db");
const URL = '/api/v1/user';
const request = (0, supertest_1.default)(index_1.app);
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.sync({ force: true });
}));
describe('User Register', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
    }));
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'password123'
    };
    test('should register a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(`${URL}/register`).send(user);
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User created successfully');
    }));
    test('should not register a user existent', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request.post(`${URL}/register`).send(user);
        const response = yield request.post(`${URL}/register`).send(user);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('User already exists');
        expect(response.body.data).toBe(null);
    }));
});
describe('User Login', () => {
    const user = {
        first_name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'password123'
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
        yield request.post(`${URL}/register`).send(user);
    }));
    test('should login a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = { email: user.email, password: user.password };
        const response = yield request.post(`${URL}/login`).send(login);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Login successful');
        expect(response.body).toHaveProperty('token');
    }));
    test('should not login a user with wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const login = { email: 'xxx@xxx.com', password: 'xxxxxxxx' };
        const response = yield request.post(`${URL}/login`).send(login);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('Invalid credentials');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.close();
    index_1.server.close();
}));
