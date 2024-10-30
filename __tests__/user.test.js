const { describe, test, it, expect } = require("@jest/globals")

const app = require('../app')
const request = require('supertest')

describe('testing endpoint post/login', () => {
  it('Berhasil login dan mengirimkan access_token', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'apaaja@mail.com',
        password: "123456",
      })
      .expect(200)
    // expect(response.body).toHaveProperty('access_token')
    // expect(typeof response.body.access_token).toBe('string')
  })
  it('Email tidak diberikan / tidak diinput', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: '',
        password: "123456",
      })
      .expect({
        message: 'Email is required'
      })
    expect(400)
  })
  it('Password tidak diberikan / tidak diinput', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'apasih@mail.com',
        password: "",
      })
      .expect({
        message: 'Password is required'
      })
    expect(400)
  })
  it('Email diberikan invalid / tidak terdaftar', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'aaaaaaa@gmail.com',
        password: "123456",
      })
      .expect({
        message: 'Invalid email/password'
      })
    expect(400)
  })
  it('Password diberikan salah / tidak match', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'apasih@mail.com',
        password: "12345678",
      })
      .expect({
        message: 'Invalid email/password'
      })
    expect(400)
  })
})
