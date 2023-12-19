import { NextFunction, Request, Response } from 'express'
import { UserSchema } from '../models/User.schema'

const account = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserSchema.findOne({
      where: { email: req.email },
      attributes: { exclude: ['id', 'password', 'craetedAt', 'updatedAt'] }
    })

    if (!user) throw new Error('User does not exist')

    return res.status(200).json({ data: user })
  } catch (error) {
    next(error)
  }
}

export { account }
