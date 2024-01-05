import { Request, Response, NextFunction } from 'express'
import { Resend } from 'resend'

const API_KEY = process.env.API_KEY_RESEND

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { first_name, last_name, email, phone, affair, message } = req.body

  if (!first_name || !last_name || !email || !phone || !affair || !message) {
    return res.status(400).json({
      message: 'Please fill all fields'
    })
  }

  try {
    const resend = new Resend(API_KEY)

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'gszcode@gmail.com',
      subject: affair,
      html: `
      <h3>Nombre: ${first_name} ${last_name}</h3>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
    `
    })

    return res.status(200).json({
      message: 'Email enviado correctamente'
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

export { sendMessage }
