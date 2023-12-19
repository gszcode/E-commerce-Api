import { server } from '../index'
import { sequelize } from '../db'
import { registerUser } from './utils/registerUser'
import { loginUser } from './utils/loginUser'

describe('User Register', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  test('should register a new user', async () => {
    const response = await registerUser()

    expect(response.status).toBe(201)
    expect(response.body.message).toBe('User created successfully')
  })

  test('should not register a user existent', async () => {
    await registerUser()
    const response = await registerUser()

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('User already exists')
    expect(response.body.data).toBe(null)
  })
})

describe('User Login', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
    await registerUser()
  })

  test('should login a user', async () => {
    const response = await loginUser('john.doe@example.com', 'password123')

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Login successful')
    expect(response.body).toHaveProperty('token')
  })

  test('should not login a user with wrong credentials', async () => {
    const response = await loginUser('xxx@xxx.com', 'xxxxxxxx')

    expect(response.status).toBe(400)
    expect(response.body.message).toBe('Invalid credentials')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
