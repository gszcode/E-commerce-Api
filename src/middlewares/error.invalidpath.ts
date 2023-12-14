import { Request, Response, NextFunction } from 'express'

export const invalidPathHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({ message: 'invalid path' })
}
