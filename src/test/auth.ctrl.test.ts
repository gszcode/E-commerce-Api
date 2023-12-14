import 'dotenv/config'
import { app, server } from '../index'
import { sequelize } from '../db'
import { UserSchema } from '../models/User.schema'
import request from 'supertest'
import bcrypt from 'bcrypt'

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

describe('Registro de Usuarios', () => {
  test('debería registrar un nuevo usuario con éxito', async () => {
    const newUser = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'securepassword'
    }

    const passwordHash = await bcrypt.hash(newUser.password, 10)
    newUser.password = passwordHash

    const response = await request(app)
      .post('/api/v1/user/register')
      .send(newUser)
    expect(response.status).toBe(201)

    const user = await UserSchema.findOne(response.body.email)
    expect(user).toBeDefined()
  })

  test('debería manejar errores al registrar un usuario existente', async () => {
    const newUser = {
      first_name: 'John',
      last_name: 'Doe',
      username: 'XXXXXXX',
      email: 'john@example.com',
      password: 'XXXXXXXXXXXXXX'
    }

    const passwordHash = await bcrypt.hash(newUser.password, 10)
    newUser.password = passwordHash

    const response = await request(app)
      .post('/api/v1/user/register')
      .send(newUser)
    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User already exists')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
