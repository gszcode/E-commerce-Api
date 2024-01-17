import { Request, Response, NextFunction } from 'express'
import { UserSchema } from '../models/User'
import { User } from '../interfaces/user.interface'
import bcrypt from 'bcrypt'
import { Auth } from '../interfaces/auth.interface'
import { validationResult } from 'express-validator'
import generateAccessToken from '../utils/generateAccessToken'
import { CustomError } from '../interfaces/error.interface'
import { generateSecureCookie } from '../utils/generateSecureCookie'
import jwt, { JwtPayload } from 'jsonwebtoken'
import nodemailer from 'nodemailer'

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
    const user = await UserSchema.findOne({
      where: { email }
    })
    if (!user) throw new CustomError('Invalid credentials', 400)

    const passwordMatch = await bcrypt.compare(
      password,
      user.getDataValue('password')
    )
    if (!passwordMatch) throw new CustomError('Invalid credentials', 400)

    const token = generateAccessToken(email, '1d')
    generateSecureCookie(res, token)

    const userData = {
      username: user.getDataValue('username'),
      first_name: user.getDataValue('first_name'),
      last_name: user.getDataValue('last_name'),
      email: user.getDataValue('email')
    }

    return res.status(200).json({
      message: 'Login successful',
      user: userData,
      token
    })
  } catch (error) {
    next(error)
  }
}

const logout = (req: Request, res: Response, next: NextFunction) => {
  try {
    return res
      .cookie('token', '', {
        expires: new Date(0)
      })
      .sendStatus(200)
  } catch (error) {
    next(error)
  }
}

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { token } = req.cookies

    if (!token) throw new CustomError('Authentication token is required', 401)

    const { user } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload
    const userFound = await UserSchema.findOne({
      where: { email: user },
      attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] }
    })

    return res.status(200).json({ data: userFound })
  } catch (error) {
    next(error)
  }
}

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let { email } = req.body
    if (!email) throw new CustomError('Email invalido', 400)

    const user = await UserSchema.findOne({ where: { email } })
    if (!user) throw new CustomError('Email invalido', 400)

    const token = generateAccessToken(email, '10m')
    const verificationLink = `https://imperio-shoes.vercel.app/recovery-password/${token}`

    const {
      NODEMAILER_HOST,
      NODEMAILER_PORT,
      NODEMAILER_USER,
      NODEMAILER_PASS
    } = process.env

    const transporter = nodemailer.createTransport({
      host: NODEMAILER_HOST,
      port: parseInt(NODEMAILER_PORT!),
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
      }
    })

    await transporter.sendMail({
      from: 'imperio@shoes.com',
      to: email,
      subject: 'Recuperar Contraseña',
      html: `<a href="${verificationLink}">Desde esté link podras actualizar tu contraseña</a>`
    })

    return res.status(200).json({
      message:
        'Revise su correo y verá un enlace para restablecer su contraseña.'
    })
  } catch (error) {
    next(error)
  }
}

const recoveryPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params
  const { password, repassword } = req.body

  try {
    if (!token) {
      throw new Error('Token no proporcionado')
    }

    const { user: userEmail } = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload
    if (!userEmail || !userEmail) {
      throw new Error('Token no válido')
    }

    if (!password || password !== repassword) {
      throw new Error('Las contraseñas no coinciden')
    }

    const user = await UserSchema.findOne({ where: { email: userEmail } })
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    const passwordHash = await bcrypt.hash(password, 10)
    await UserSchema.update(
      { password: passwordHash },
      { where: { email: userEmail } }
    )

    return res.status(200).json({
      message: 'Contraseña cambiada exitosamente'
    })
  } catch (error: any) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      return res.status(400).json({ message: 'Token no válido' })
    }

    return next(error)
  }
}

export {
  register,
  login,
  logout,
  verifyToken,
  forgotPassword,
  recoveryPassword
}
