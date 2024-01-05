"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactValidation = void 0;
const express_validator_1 = require("express-validator");
const fieldValidation = (fieldName, fieldLabel) => {
    return (0, express_validator_1.body)(fieldName)
        .notEmpty()
        .trim()
        .withMessage(`${fieldLabel} is required`)
        .isString()
        .withMessage(`Invalid ${fieldLabel}`);
};
exports.contactValidation = [
    fieldValidation('first_name', 'Name'),
    fieldValidation('last_name', 'Surname'),
    fieldValidation('username', 'Username'),
    fieldValidation('phone', 'Phone'),
    fieldValidation('affair', 'Affair'),
    fieldValidation('message', 'Message'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email')
        .escape()
        .trim()
];
