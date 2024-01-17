"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newPasswordValidation = exports.forgotEmailValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
const error_interface_1 = require("../interfaces/error.interface");
const fieldValidation = (fieldName, fieldLabel) => {
    return (0, express_validator_1.body)(fieldName)
        .notEmpty()
        .trim()
        .withMessage(`${fieldLabel} is required`)
        .isString()
        .withMessage(`Invalid ${fieldLabel}`);
};
exports.registerValidation = [
    fieldValidation('first_name', 'Name'),
    fieldValidation('last_name', 'Surname'),
    fieldValidation('username', 'Username'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email')
        .escape()
        .trim(),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .trim()
];
exports.loginValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email')
        .escape()
        .trim(),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required').trim()
];
exports.forgotEmailValidation = [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email')
        .escape()
        .trim()
];
exports.newPasswordValidation = [
    (0, express_validator_1.body)('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .trim(),
    (0, express_validator_1.body)('repassword')
        .notEmpty()
        .withMessage('Password is required')
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new error_interface_1.CustomError('La contraseñas no coinciden', 404);
        }
    })
];
