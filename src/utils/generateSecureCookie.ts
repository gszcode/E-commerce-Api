import { Response } from 'express'

export const generateSecureCookie = (res: Response, token: string) => {
  const MODE = process.env.NODE_ENV === 'production'

  const cookieOptions = {
    httpOnly: MODE,
    secure: MODE
  }

  res.cookie('token', token, cookieOptions)
}
