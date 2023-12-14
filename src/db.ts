import { Sequelize } from 'sequelize'

const isTestEnvironment = process.env.NODE_ENV === 'test'

export const sequelize = new Sequelize(
  isTestEnvironment ? 'ecommerce_test' : 'ecommerce',
  'postgres',
  'password',
  {
    host: 'localhost',
    dialect: 'postgres',
    port: 5434
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
