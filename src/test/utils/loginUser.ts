import supertest from 'supertest'
import { app } from '../../index'
const request = supertest(app)
const URL_AUTH = '/api/v1/auth'

export const loginUser = async (email: string, password: string) => {
  const login = { email, password }
  return request.post(`${URL_AUTH}/login`).send(login)
}
