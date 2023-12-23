import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      email?: string | JwtPayload
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { token } = req.cookies

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authentication token is required' })
    }

    const { user } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    req.email = user

    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
