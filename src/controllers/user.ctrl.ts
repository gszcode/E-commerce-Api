import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import { UserSchema } from '../models/User.schema'
import { User } from '../interfaces/user.interface'
import bcrypt from 'bcrypt'
import { Auth } from '../interfaces/auth.interface'

const register = async (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, username, email, password }: User = req.body

  try {
    let user = await UserSchema.findOne({ where: { email } })
    if (user) throw new Error('User already exists')

    const passwordHash = await bcrypt.hash(password, 10)

    user = await UserSchema.create({
      first_name,
      last_name,
      username,
      email,
      password: passwordHash
    })

    return res.status(201).json({
      message: 'User created successfully',
      data: user
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: Auth = req.body

  try {
    const user = await UserSchema.findOne({
      where: { email }
    })
    if (!user) throw new Error('Invalid credentials')

    const passwordMatch = await bcrypt.compare(
      password,
      user.getDataValue('password')
    )
    if (!passwordMatch) throw new Error('Invalid password')

    return res.status(200).json({
      message: 'Login successful'
    })
  } catch (error) {
    next(error)
  }
}

export { register, login }
