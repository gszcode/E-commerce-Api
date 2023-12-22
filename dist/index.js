"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.server = void 0;
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Initialization
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 3001;
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use((0, cookie_parser_1.default)());
const server = app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
    (0, db_1.syncDatabase)();
});
exports.server = server;
// Routes
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const user_route_1 = __importDefault(require("./routes/user.route"));
app.use('/api/v1/auth', auth_route_1.default);
app.use('/api/v1/user', user_route_1.default);
// Errors handle
const error_handle_1 = require("./middlewares/error.handle");
const error_invalidpath_1 = require("./middlewares/error.invalidpath");
app.use(error_handle_1.errorHandler);
app.use(error_invalidpath_1.invalidPathHandler);
