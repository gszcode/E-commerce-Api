"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_ctrl_1 = require("../controllers/user.ctrl");
const router = (0, express_1.Router)();
router.post('/register', user_ctrl_1.register);
router.post('/login', user_ctrl_1.login);
exports.default = router;
