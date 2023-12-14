"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (error, req, res, next) => {
    console.log(`error ${error.message}`);
    const status = error.status || 400;
    return res.status(status).json({ message: error.message, data: null });
};
exports.errorHandler = errorHandler;
