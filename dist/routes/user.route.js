"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_ctrl_1 = require("../controllers/user.ctrl");
const verify_token_1 = require("../middlewares/verify.token");
const router = (0, express_1.Router)();
router.get('/account', verify_token_1.verifyToken, user_ctrl_1.account);
exports.default = router;
