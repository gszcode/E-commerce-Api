import { NextFunction, Request, Response } from 'express'
import { CustomError } from '../interfaces/error.interface'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(error.message)

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ error: error.message })
  } else {
    res.status(500).json({ error: 'An internal error occurred' })
  }
}
