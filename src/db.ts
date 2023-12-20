import { Dialect, Sequelize } from 'sequelize'

const isTestEnvironment = process.env.NODE_ENV === 'test'
const {
  DATABASE,
  DATABASE_TEST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_DIALECT,
  DATABASE_PORT
} = process.env

export const sequelize = new Sequelize(
  isTestEnvironment ? DATABASE_TEST! : DATABASE!,
  DATABASE_USERNAME!,
  DATABASE_PASSWORD,
  {
    host: DATABASE_HOST,
    dialect: DATABASE_DIALECT! as Dialect,
    port: parseInt(DATABASE_PORT!)
  }
)

export async function syncDatabase() {
  try {
    await sequelize.sync({ force: true })
    console.log('Database synchronized successfully')
  } catch (error) {
    console.error(`Unable to synchronize the database: ${error}`)
  }
}
