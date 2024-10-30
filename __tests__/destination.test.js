const { describe, it, expect } = require("@jest/globals")
const request = require('supertest')
const app = require('../app') // Pastikan jalurnya sesuai dengan file app Anda

describe('DestinationController', () => {
  describe('GET /destination', () => {
    it('should return all destinations', async () => {
      const response = await request(app).get('/destination')
      expect(response.status).toBe(200)
      expect(response.body.length).toBeGreaterThan(0) // Pastikan ada setidaknya satu destinasi
    })

    it('should return 500 if there is an error', async () => {
      const response = await request(app).get('/destination/id') // ID tidak valid
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Failed to retrieve destinations' })
    })
  })

  describe('GET /destination/:id', () => {
    it('should return a destination by ID', async () => {
      const response = await request(app).get('/destination/1') // Pastikan ID ini valid di DB
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id', 1)
    })

    it('should return 404 if destination not found', async () => {
      const response = await request(app).get('/destination/999') // ID yang tidak ada
      expect(response.status).toBe(404)
      expect(response.body).toEqual({ error: 'Destination not found' })
    })

    it('should return 500 if there is an error', async () => {
      const response = await request(app).get('/destination/invalid-id')
      expect(response.status).toBe(500)
      expect(response.body).toEqual({ error: 'Failed to retrieve destinations' })
    })
  })
})
