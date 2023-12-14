"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const db_1 = require("../db");
const sequelize_1 = require("sequelize");
exports.UserSchema = db_1.sequelize.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
});
