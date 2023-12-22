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
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
  syncDatabase()
})

// Routes
import authRoute from './routes/auth.route'
import userRoute from './routes/user.route'
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)

// Errors handle
import { errorHandler } from './middlewares/error.handle'
import { invalidPathHandler } from './middlewares/error.invalidpath'
app.use(errorHandler)
app.use(invalidPathHandler)

export { server, app }
