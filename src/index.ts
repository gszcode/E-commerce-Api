import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import express from 'express'
import { syncDatabase } from './db'

// Initialization
const app = express()
const PORT = process.env.PORT || 3001

// Middlewares
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

const server = app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
  syncDatabase()
})

// Routes
import authRoute from './routes/auth.route'
app.use('/api/v1/auth', authRoute)

// Errors handle
import { errorHandler } from './middlewares/error.handle'
import { invalidPathHandler } from './middlewares/error.invalidpath'
app.use(errorHandler)
app.use(invalidPathHandler)

export { server, app }
