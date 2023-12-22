import { Response } from 'express'
import { serialize } from 'cookie'

export const generateSecureCookie = (res: Response, token: string) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  }

  res.setHeader('Set-Cookie', serialize('token', token, cookieOptions))
}
