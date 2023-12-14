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
const index_1 = require("../src/index");
const db_1 = require("../src/db");
const User_schema_1 = require("../src/models/User.schema");
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.sync({ force: true });
}));
describe('Registro de Usuarios', () => {
    test('debería registrar un nuevo usuario con éxito', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'securepassword'
        };
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/register').send(newUser);
        expect(response.status).toBe(201);
        const user = yield User_schema_1.User.findByPk(response.body.id);
        expect(user).toBeDefined();
    }));
    test('debería manejar errores al registrar un usuario existente', () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            first_name: 'John',
            last_name: 'Doe',
            username: 'johndoe',
            email: 'john@example.com',
            password: 'securepassword'
        };
        yield User_schema_1.User.create(user);
        const response = yield (0, supertest_1.default)(index_1.app).post('/api/register').send(user);
        expect(response.status).toBe(400);
        const users = yield User_schema_1.User.findAll();
        expect(users.length).toBe(1);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.sequelize.close();
    index_1.server.close();
}));
