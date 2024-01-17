"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_validation_1 = require("../middlewares/auth.validation");
const auth_ctrl_1 = require("../controllers/auth.ctrl");
const router = (0, express_1.Router)();
router.post('/register', auth_validation_1.registerValidation, auth_ctrl_1.register);
router.post('/login', auth_validation_1.loginValidation, auth_ctrl_1.login);
router.post('/logout', auth_ctrl_1.logout);
router.get('/verify-token', auth_ctrl_1.verifyToken);
router.post('/forgot-password', auth_validation_1.forgotEmailValidation, auth_ctrl_1.forgotPassword);
router.put('/recovery-password/:token', auth_validation_1.newPasswordValidation, auth_ctrl_1.recoveryPassword);
exports.default = router;
