import { server, app } from '../index'
import { sequelize } from '../db'
import { registerUser } from './utils/registerUser'
import { loginUser, logoutUser } from './utils/loginUser'
import supertest from 'supertest'

const request = supertest(app)
const URL_AUTH = '/api/v1/auth'

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
    expect(response.body.error).toBe('User already exists')
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
  })

  test('should not login a user with wrong credentials', async () => {
    const response = await loginUser('xxx@xxx.com', 'xxxxxxxx')

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Invalid credentials')
  })
})

describe('User Logout', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
    await registerUser()
  })

  test('should logout a user', async () => {
    await loginUser('john.doe@example.com', 'password123')
    const response = await logoutUser()

    expect(response.status).toBe(200)
  })
})

describe('Verify Token', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
    await registerUser()
  })

  test('allow access to data with token', async () => {
    const responseLogin = await loginUser('john.doe@example.com', 'password123')
    const token = responseLogin.body.token

    const response = await request
      .get(`${URL_AUTH}/verify-token`)
      .set('Cookie', `token=${token}`)

    expect(response.status).toBe(200)
    expect(response.body.data.email).toBe('john.doe@example.com')
  })

  test('deny access without token', async () => {
    await loginUser('john.doe@example.com', 'password123')
    const response = await request.get(`${URL_AUTH}/verify-token`)

    expect(response.status).toBe(401)
    expect(response.body.error).toBe('Authentication token is required')
  })
})

describe('Forgot Password', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
    await registerUser()
  })

  test('I should receive an email to change my password', async () => {
    const response = await request
      .post(`${URL_AUTH}/forgot-password`)
      .send({ email: 'john.doe@example.com' })

    expect(response.status).toBe(200)
    expect(response.body.message).toBe(
      'Revise su correo y verá un enlace para restablecer su contraseña.'
    )
  })

  test('I should not receive an email with an invalid one', async () => {
    const response = await request
      .post(`${URL_AUTH}/forgot-password`)
      .send({ email: 'jon.doe@example.com' })

    expect(response.status).toBe(400)
    expect(response.body.error).toBe('Email invalido')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
