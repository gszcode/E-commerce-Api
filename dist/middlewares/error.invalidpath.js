"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidPathHandler = void 0;
const invalidPathHandler = (req, res, next) => {
    res.status(404).json({ message: 'invalid path' });
};
exports.invalidPathHandler = invalidPathHandler;
