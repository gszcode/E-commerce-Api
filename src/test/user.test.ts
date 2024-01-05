import { app, server } from '../index'
import { sequelize } from '../db'
import { registerUser } from './utils/registerUser'
import { loginUser } from './utils/loginUser'
import supertest from 'supertest'

const request = supertest(app)
const URL_USER = '/api/v1/user'

describe('My Account', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  test('I should see my data', async () => {
    await registerUser()
    const responseLogin = await loginUser('john.doe@example.com', 'password123')
    const token = responseLogin.body.token

    const response = await request
      .get(`${URL_USER}/account`)
      .set('Cookie', `token=${token}`)

    expect(response.status).toBe(200)
    expect(response.body.data.email).toBe('john.doe@example.com')
  })

  test('I should not see my data without token', async () => {
    await registerUser()
    await loginUser('john.doe@example.com', 'password123')

    const response = await request.get(`${URL_USER}/account`)
    console.log('ACCOUNT ERROR', response.body)

    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Authentication token is required')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
