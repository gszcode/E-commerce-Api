import supertest from 'supertest'
import { app, server } from '../index'
import { sequelize } from '../db'
const URL = '/api/v1/user'

const request = supertest(app)

beforeAll(async () => {
  await sequelize.sync({ force: true })
})

describe('User Register', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  const user = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123'
  }

  test('should register a new user', async () => {
    const response = await request.post(`${URL}/register`).send(user)

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('User created successfully')
    expect(response.body.data).toHaveProperty('id')
  })

  test('should not register a user existent', async () => {
    await request.post(`${URL}/register`).send(user)
    const response = await request.post(`${URL}/register`).send(user)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User already exists')
    expect(response.body.data).toBe(null)
  })
})

describe('User Login', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  const user = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123'
  }

  test('should login a user', async () => {
    await request.post(`${URL}/register`).send(user)
    const login = { email: user.email, password: user.password }
    const response = await request.post(`${URL}/login`).send(login)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Login successful')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
