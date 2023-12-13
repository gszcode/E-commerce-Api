import 'dotenv/config'
import express from 'express'
import { sequelize } from './db'
import cors from 'cors'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

import './models/User.schema'

async function main() {
  try {
    await sequelize.sync({ force: true })
    app.listen(PORT, () =>
      console.error(`Connect to the database on port: ${PORT}`)
    )
  } catch (error) {
    console.error(`Unable to connect to the database: ${error}`)
  }
}

main()
