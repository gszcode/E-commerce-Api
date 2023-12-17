import { body } from 'express-validator'

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
]
