import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`error handler ${error.message}`)
  console.log(`error handler ${error.status}`)
  const status = error.status || 500

  if (error.message === 'User already exists')
    return res.status(status).json({ message: error.message })
  if (error.message === 'Invalid credentials')
    return res.status(status).json({ message: error.message, token: null })
  if (error.message === 'User does not exist')
    return res.status(status).json({ message: error.message, data: null })

  return res.status(status).json({ message: 'A server problem occurred' })
}
