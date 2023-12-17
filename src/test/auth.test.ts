import supertest from 'supertest'
import { app, server } from '../index'
import { sequelize } from '../db'

const request = supertest(app)
const URL = '/api/v1/auth'

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
  const user = {
    first_name: 'John',
    last_name: 'Doe',
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123'
  }

  beforeAll(async () => {
    await sequelize.sync({ force: true })
    await request.post(`${URL}/register`).send(user)
  })

  test('should login a user', async () => {
    const login = { email: user.email, password: user.password }
    const response = await request.post(`${URL}/login`).send(login)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Login successful')
    expect(response.body).toHaveProperty('token')
  })

  test('should not login a user with wrong credentials', async () => {
    const login = { email: 'xxx@xxx.com', password: 'xxxxxxxx' }
    const response = await request.post(`${URL}/login`).send(login)

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid credentials')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
