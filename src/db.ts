import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('ecommerce', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5434
})
