import { app, server } from '../index'
import { sequelize } from '../db'
import supertest from 'supertest'

const request = supertest(app)
const URL_CONTACT = '/api/v1/contact'

describe('CONCTACT', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true })
  })

  const message = {
    first_name: 'test',
    last_name: 'test',
    email: 'test@test.com',
    phone: '000000000000',
    affair: 'test',
    message: 'message test'
  }

  test('send message for contact form', async () => {
    const response = await request.post(URL_CONTACT).send(message)

    expect(response.status).toBe(200)
    expect(response.body.message).toBe('Email enviado correctamente')
  })
})

afterAll(async () => {
  await sequelize.close()
  server.close()
})
