const { describe, it, beforeEach, expect } = require("@jest/globals")
const request = require("supertest")
const app = require("../app")
const { Trip, TripDestination } = require("../models")
const { signToken } = require('../helpers/jwt')
const token = signToken({ id: 1 })

describe("TripController", () => {
  beforeEach(async () => {
    await Trip.destroy({ where: {}, force: true })
    await TripDestination.destroy({ where: {}, force: true })
  })

  describe("GET /trip", () => {
    it("should return all trips", async () => {
      const trip = await Trip.create({
        userId: 1,
        title: "Trip to Jateng",
        startDate: new Date(),
        endDate: new Date(),
      })

      const response = await request(app)
        .get("/trip")
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body.length).toBeGreaterThan(0)
      expect(response.body[0]).toHaveProperty("id", trip.id)
    })
  })

  describe("GET /trip/:id", () => {
    it("should return a trip by ID", async () => {
      const trip = await Trip.create({
        userId: 1,
        title: "Trip to Jateng",
        startDate: new Date(),
        endDate: new Date(),
      })

      const response = await request(app)
        .get(`/trip/${trip.id}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("id", trip.id)
    })

    it("should return 404 if trip not found", async () => {
      const response = await request(app)
        .get("/trip/999")
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: "Trip not found" })
    })
  })

  describe("POST /trip", () => {
    it("should create a new trip and associate with destinations", async () => {
      const tripResponse = await request(app)
        .post("/trip")
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: 1,
          title: "Trip to Jateng",
          startDate: new Date(),
          endDate: new Date(),
          destinationIds: [1, 2]
        })

      expect(tripResponse.status).toBe(201)
      expect(tripResponse.body).toHaveProperty("id")
      expect(tripResponse.body).toHaveProperty("title", "Trip to Jateng")

      const tripDestinations = await TripDestination.findAll({
        where: { tripId: tripResponse.body.id }
      })
      expect(tripDestinations.length).toBe(2)
    })
  })

  describe("PUT /trip/:id", () => {
    it("should update a trip and its destinations", async () => {
      const trip = await Trip.create({
        userId: 1,
        title: "Trip to Jateng",
        startDate: new Date(),
        endDate: new Date(),
      })

      await TripDestination.create({ tripId: trip.id, destinationId: 1 })
      await TripDestination.create({ tripId: trip.id, destinationId: 2 })

      const response = await request(app)
        .put(`/trip/${trip.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: "Updated Trip to Jateng",
          startDate: new Date(),
          endDate: new Date(),
          destinationId: [3]
        })

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty("id", trip.id)
      expect(response.body).toHaveProperty("title", "Updated Trip to Jateng")

      const updatedTripDestinations = await TripDestination.findAll({
        where: { tripId: trip.id }
      })
      expect(updatedTripDestinations.length).toBe(1)
    })

    it("should return 404 if trip not found", async () => {
      const response = await request(app)
        .put("/trip/999")
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: "Updated Trip",
          startDate: new Date(),
          endDate: new Date(),
        })

      expect(response.status).toBe(404)
      expect(response.body).toEqual({ message: "Trip not found" })
    })
  })
})
