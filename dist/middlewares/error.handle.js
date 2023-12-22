"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const error_interface_1 = require("../interfaces/error.interface");
const errorHandler = (error, req, res, next) => {
    console.error(error.message);
    if (error instanceof error_interface_1.CustomError) {
        res.status(error.statusCode).json({ error: error.message });
    }
    else {
        res.status(500).json({ error: 'An internal error occurred' });
    }
};
exports.errorHandler = errorHandler;
