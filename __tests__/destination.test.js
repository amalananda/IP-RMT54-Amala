const { describe, it, expect, beforeEach } = require("@jest/globals")
const request = require('supertest')
const app = require('../app')
const { signToken } = require('../helpers/jwt')
const token = signToken({ id: 1 })

describe('DestinationController', () => {
  describe('GET /destination', () => {
    it('should return all destinations', async () => {
      const response = await request(app)
        .get('/destination')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.length).toBeGreaterThan(0)
    })

    it('should return 500 if there is an error', async () => {
      const response = await request(app)
        .get('/destination/id')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Failed to retrieve destinations' })
    })
  })

  describe('GET /destination/:id', () => {
    it('should return a destination by ID', async () => {
      const response = await request(app)
        .get('/destination/1')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id', 1)
    })

    it('should return 404 if destination not found', async () => {
      const response = await request(app)
        .get('/destination/999')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'Destination not found' })
    })

    it('should return 500 if there is an error', async () => {
      const response = await request(app)
        .get('/destination/invalid-id')
        .set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Failed to retrieve destinations' })
    })
  })
})
