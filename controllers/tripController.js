const { Trip, TripDestination, Destination } = require('../models')

module.exports = class TripController {
  // Mendapatkan semua trip beserta destinasi terkait
  static async getTrips(req, res, next) {
    try {
      const trips = await Trip.findAll()
      res.json(trips)
    } catch (error) {
      next(error) // Mengirim kesalahan ke middleware error handler
    }
  }

  // Mendapatkan trip berdasarkan ID beserta destinasi terkait
  static async getTripById(req, res, next) {
    const { id } = req.params
    try {
      const trip = await Trip.findByPk(req.params.id)
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" })
      }
      res.json(trip)
    } catch (error) {
      next(error) // Pastikan kesalahan diteruskan ke middleware error handler
    }
  }

  // Membuat trip baru dan menyimpan destinasi terkait
  static async createTrip(req, res, next) {
    const { userId, title, startDate, endDate, destinations } = req.body
    try {
      const newTrip = await Trip.create({ userId, title, startDate, endDate })
      if (destinations && destinations.length) {
        await newTrip.setDestinations(destinations)
      }
      res.status(201).json(newTrip)
    } catch (error) {
      next(error)
    }
  }

  // Memperbarui trip berdasarkan ID dan destinasi terkait
  static async updateTrip(req, res, next) {
    const { destinations } = req.body
    console.log("Destinations received:", destinations) // Log destinasi yang diterima

    try {
      const [updated] = await Trip.update(req.body, {
        where: { id: req.params.id }
      })

      if (updated === 0) {
        return res.status(404).json({ message: "Trip not found" })
      }

      const updatedTrip = await Trip.findByPk(req.params.id)
      console.log("Updated trip:", updatedTrip) // Log trip yang diperbarui

      // Mengatur ulang destinasi terkait
      if (destinations && destinations.length) {
        await updatedTrip.setDestinations(destinations)
        console.log("Destinations set for trip:", await updatedTrip.getDestinations()) // Log destinasi yang baru disetel
      } else {
        await updatedTrip.setDestinations([])
      }

      res.json(updatedTrip)
    } catch (error) {
      console.error("Error updating trip:", error) // Log kesalahan
      next(error)
    }
  }

}
