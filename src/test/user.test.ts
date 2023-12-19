// import supertest from 'supertest'
// import { app, server } from '../index'
// import { sequelize } from '../db'

// const request = supertest(app)
// const URL_AUTH = '/api/v1/auth'
// const URL_USER = '/api/v1/user'

// describe.skip('My Account', () => {
//   beforeAll(async () => {
//     await sequelize.sync({ force: true })
//   })

//   const user = {
//     first_name: 'John',
//     last_name: 'Doe',
//     username: 'johndoe',
//     email: 'john.doe@example.com',
//     password: 'password123'
//   }

//   test('I should see my data', async () => {
//     await request.post(`${URL_AUTH}/register`).send(user)
//     const login = { email: user.email, password: user.password }
//     const responseLogin = await request.post(`${URL_AUTH}/login`).send(login)
//     const token = responseLogin.body.token

//     const response = await request
//       .get(`${URL_USER}/account`)
//       .set('Authorization', `Bearer ${token}`)

//     expect(response.status).toBe(200)
//     expect(response.body.email).toBe(user.email)
//   })
// })

// afterAll(async () => {
//   await sequelize.close()
//   server.close()
// })
