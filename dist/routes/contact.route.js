"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_ctrl_1 = require("../controllers/contact.ctrl");
const contact_validation_1 = require("../middlewares/contact.validation");
const router = (0, express_1.Router)();
router.post('/', contact_validation_1.contactValidation, contact_ctrl_1.sendMessage);
exports.default = router;
