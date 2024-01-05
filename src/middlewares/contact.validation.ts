import { body } from 'express-validator'

const fieldValidation = (fieldName: string, fieldLabel: string) => {
  return body(fieldName)
    .notEmpty()
    .trim()
    .withMessage(`${fieldLabel} is required`)
    .isString()
    .withMessage(`Invalid ${fieldLabel}`)
}

export const contactValidation = [
  fieldValidation('first_name', 'Name'),
  fieldValidation('last_name', 'Surname'),
  fieldValidation('username', 'Username'),
  fieldValidation('phone', 'Phone'),
  fieldValidation('affair', 'Affair'),
  fieldValidation('message', 'Message'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email')
    .escape()
    .trim()
]
