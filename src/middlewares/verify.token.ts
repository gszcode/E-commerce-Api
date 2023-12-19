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
    const token = req.headers['authorization']

    if (!token) {
      return res
        .status(401)
        .json({ message: 'Authentication token is required' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    if (typeof decoded === 'string') req.email = decoded
    else req.email = decoded.user
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
