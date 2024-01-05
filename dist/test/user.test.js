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
const URL_USER = '/api/v1/user';
describe('My Account', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
    }));
    test('I should see my data', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, registerUser_1.registerUser)();
        const responseLogin = yield (0, loginUser_1.loginUser)('john.doe@example.com', 'password123');
        const token = responseLogin.body.token;
        const response = yield request
            .get(`${URL_USER}/account`)
            .set('Cookie', `token=${token}`);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe('john.doe@example.com');
    }));
    test('I should not see my data without token', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, registerUser_1.registerUser)();
        yield (0, loginUser_1.loginUser)('john.doe@example.com', 'password123');
        const response = yield request.get(`${URL_USER}/account`);
        console.log('ACCOUNT ERROR', response.body);
        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Authentication token is required');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.close();
    index_1.server.close();
}));
