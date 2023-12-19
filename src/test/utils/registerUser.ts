import supertest from 'supertest'
import { app } from '../../index'
const request = supertest(app)
const URL_AUTH = '/api/v1/auth'

const user = {
  first_name: 'John',
  last_name: 'Doe',
  username: 'johndoe',
  email: 'john.doe@example.com',
  password: 'password123'
}

export const registerUser = async () => {
  return request.post(`${URL_AUTH}/register`).send(user)
}
