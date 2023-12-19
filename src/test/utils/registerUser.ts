import supertest from 'supertest'
import { app } from '../../index'
import { User } from '../../interfaces/user.interface'
const request = supertest(app)
const URL_AUTH = '/api/v1/auth'

export const registerUser = async (user: User) => {
  return request.post(`${URL_AUTH}/register`).send(user)
}
