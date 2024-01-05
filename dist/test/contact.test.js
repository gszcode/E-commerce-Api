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
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(index_1.app);
const URL_CONTACT = '/api/v1/contact';
describe('CONCTACT', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.sequelize.sync({ force: true });
    }));
    const message = {
        first_name: 'test',
        last_name: 'test',
        email: 'test@test.com',
        phone: '000000000000',
        affair: 'test',
        message: 'message test'
    };
    test('send message for contact form', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post(URL_CONTACT).send(message);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Email enviado correctamente');
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.close();
    index_1.server.close();
}));
