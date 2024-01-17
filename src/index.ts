import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { syncDatabase } from './db'
import cookieParser from 'cookie-parser'

// Initialization
const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(
  cors({
    origin: [
      'https://imperio-shoes.vercel.app',
      'http://localhost:5173,origin'
    ],
    credentials: true
  })
)
app.use(express.json())
app.use(morgan('dev'))
app.use(cookieParser())

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
  syncDatabase()
})

// Routes
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
import contactRoute from './routes/contact.route'
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/contact', contactRoute)

// Errors handle
import { errorHandler } from './middlewares/error.handle'
import { invalidPathHandler } from './middlewares/error.invalidpath'
app.use(errorHandler)
app.use(invalidPathHandler)

export { server, app }
