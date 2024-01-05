"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const resend_1 = require("resend");
const API_KEY = process.env.API_KEY_RESEND;
const sendMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, phone, affair, message } = req.body;
    if (!first_name || !last_name || !email || !phone || !affair || !message) {
        return res.status(400).json({
            message: 'Please fill all fields'
        });
    }
    try {
        const resend = new resend_1.Resend(API_KEY);
        resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'gszcode@gmail.com',
            subject: affair,
            html: `
      <h3>Nombre: ${first_name} ${last_name}</h3>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
    `
        });
        return res.status(200).json({
            message: 'Email enviado correctamente'
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.sendMessage = sendMessage;
