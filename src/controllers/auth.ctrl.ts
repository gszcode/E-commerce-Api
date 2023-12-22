import { Request, Response, NextFunction } from 'express'
import { UserSchema } from '../models/User.schema'
import { User } from '../interfaces/user.interface'
import bcrypt from 'bcrypt'
import { Auth } from '../interfaces/auth.interface'
import { validationResult } from 'express-validator'
import generateAccessToken from '../utils/generateAccessToken'
import { CustomError } from '../interfaces/error.interface'

const register = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    return res.status(400).json({
      errors: result.array()[0].msg
    })
  }

  const { first_name, last_name, username, email, password }: User = req.body

  try {
    let user = await UserSchema.findOne({ where: { email } })
    if (user) throw new CustomError('User already exists', 400)

    const passwordHash = await bcrypt.hash(password, 10)

    user = await UserSchema.create({
      first_name,
      last_name,
      username,
      email,
      password: passwordHash
    })

    return res.status(201).json({
      message: 'User created successfully'
    })
  } catch (error) {
    next(error)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password }: Auth = req.body

  try {
    const user = await UserSchema.findOne({ where: { email } })
    if (!user) throw new CustomError('Invalid credentials', 400)

    const passwordMatch = await bcrypt.compare(
      password,
      user.getDataValue('password')
    )
    if (!passwordMatch) throw new CustomError('Invalid credentials', 400)

    const token = generateAccessToken(email)

    return res.status(200).json({
      message: 'Login successful',
      token
    })
  } catch (error) {
    next(error)
  }
}

export { register, login }
