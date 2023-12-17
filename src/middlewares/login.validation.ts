import { body } from 'express-validator'

export const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .escape()
    .trim(),
  body('password').notEmpty().withMessage('Password is required')
]
