import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`error ${error.message}`)
  const status = error.status || 400

  return res.status(status).json({ message: error.message })
}
