import { body } from 'express-validator'
import { CustomError } from '../interfaces/error.interface'

const fieldValidation = (fieldName: string, fieldLabel: string) => {
  return body(fieldName)
    .notEmpty()
    .trim()
    .withMessage(`${fieldLabel} is required`)
    .isString()
    .withMessage(`Invalid ${fieldLabel}`)
}

export const registerValidation = [
  fieldValidation('first_name', 'Name'),
  fieldValidation('last_name', 'Surname'),
  fieldValidation('username', 'Username'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .escape()
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .trim()
]

export const loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .escape()
    .trim(),
  body('password').notEmpty().withMessage('Password is required').trim()
]

export const forgotEmailValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .escape()
    .trim()
]

export const newPasswordValidation = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .trim(),
  body('repassword')
    .notEmpty()
    .withMessage('Password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new CustomError('La contraseñas no coinciden', 404)
      }
    })
]
