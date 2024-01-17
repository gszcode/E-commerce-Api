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
const index_1 = require("../index");
const db_1 = require("../db");
const registerUser_1 = require("./utils/registerUser");
const loginUser_1 = require("./utils/loginUser");
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.app);
const URL_AUTH = '/api/v1/auth';
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
        expect(response.body.error).toBe('User already exists');
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
    }));
    test('should not login a user with wrong credentials', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, loginUser_1.loginUser)('xxx@xxx.com', 'xxxxxxxx');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid credentials');
    }));
});
describe('User Logout', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
        yield (0, registerUser_1.registerUser)();
    }));
    test('should logout a user', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, loginUser_1.loginUser)('john.doe@example.com', 'password123');
        const response = yield (0, loginUser_1.logoutUser)();
        expect(response.status).toBe(200);
    }));
});
describe('Verify Token', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
        yield (0, registerUser_1.registerUser)();
    }));
    test('allow access to data with token', () => __awaiter(void 0, void 0, void 0, function* () {
        const responseLogin = yield (0, loginUser_1.loginUser)('john.doe@example.com', 'password123');
        const token = responseLogin.body.token;
        const response = yield request
            .get(`${URL_AUTH}/verify-token`)
            .set('Cookie', `token=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe('john.doe@example.com');
    }));
    test('deny access without token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, loginUser_1.loginUser)('john.doe@example.com', 'password123');
        const response = yield request.get(`${URL_AUTH}/verify-token`);
        expect(response.status).toBe(401);
        expect(response.body.error).toBe('Authentication token is required');
    }));
});
describe('Forgot Password', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
        yield (0, registerUser_1.registerUser)();
    }));
    test('I should receive an email to change my password', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post(`${URL_AUTH}/forgot-password`)
            .send({ email: 'john.doe@example.com' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Revise su correo y verá un enlace para restablecer su contraseña.');
    }));
    test('I should not receive an email with an invalid one', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post(`${URL_AUTH}/forgot-password`)
            .send({ email: 'jon.doe@example.com' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Email invalido');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.close();
    index_1.server.close();
}));
