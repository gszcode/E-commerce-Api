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
exports.syncDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const isTestEnvironment = process.env.NODE_ENV === 'test';
const { DATABASE, DATABASE_TEST, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_DIALECT, DATABASE_PORT } = process.env;
exports.sequelize = new sequelize_1.Sequelize(isTestEnvironment ? DATABASE_TEST : DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT,
    port: parseInt(DATABASE_PORT)
});
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelize.sync({ force: true });
            console.log('Database synchronized successfully');
        }
        catch (error) {
            console.error(`Unable to synchronize the database: ${error}`);
        }
    });
}
exports.syncDatabase = syncDatabase;
