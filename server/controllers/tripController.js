const { Trip, TripDestination, Destination } = require('../models')

module.exports = class TripController {
  // Mendapatkan semua trip beserta destinasi terkait
  static async getTrips(req, res, next) {
    try {
      // only user trip is shown
      const trips = await Trip.findAll({ include: [Destination] })
      res.json(trips)
    } catch (error) {
      next(error) // Mengirim kesalahan ke middleware error handler
    }
  }

  // Mendapatkan trip berdasarkan ID beserta destinasi terkait
  static async getTripById(req, res, next) {
    const { id } = req.params
    try {
      const trip = await Trip.findByPk(id)
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
    const { title, startDate, endDate, destinationIds } = req.body
    const userId = req.user.id
    try {
      const newTrip = await Trip.create({ userId, title, startDate, endDate })
      if (destinationIds && destinationIds.length > 0) {

        // destinationIds: array
        destinations = await Destination.findAll({
          where: {
            id: destinationIds
          }
        })
        await newTrip.setDestinations(destinations)
      }

      res.status(201).json(newTrip)
    } catch (error) {
      next(error)
    }
  }

  // Memperbarui trip berdasarkan ID dan destinasi terkait
  static async updateTrip(req, res, next) {
    const { destinationId } = req.body

    // console.log("Destinations received:", destinationId) // Log destinasi yang diterima

    try {
      const [updated] = await Trip.update(req.body, {
        where: { id: req.params.id }
      })



      if (updated === 0) {
        return res.status(404).json({ message: "Trip not found" })
      }



      const selectedTrip = await Trip.findByPk(req.params.id)

      // check if the trip owns by user
      if (selectedTrip.userId !== req.user.id) {
        // ganti unauthorisze
        return res.status(401).json({ message: "You are unauthorized" })
      }

      // Mengatur ulang destinasi terkait
      if (destinationId) {
        const destinations = await Destination.findByPk(destinationId)

        await selectedTrip.addDestinations(destinations)
        // console.log("Destinations set for trip:", await selectedTrip.getDestinations()) // Log destinasi yang baru disetel
      }

      const updatedTrip = await Trip.findByPk(selectedTrip.id, { include: [Destination] })


      res.json(updatedTrip)
    } catch (error) {
      console.error("Error updating trip:", error) // Log kesalahan
      next(error)
    }
  }
  static async getTripsByUser(req, res, next) {
    console.log("HERE")

    const userId = req.user.id // Asumsi Anda menyimpan user ID dalam token
    try {
      const trips = await Trip.findAll({
        where: { userId },
        include: [Destination], // Mengikutkan destinasi
      })
      res.json(trips)
    } catch (error) {
      next(error)
    }
  }

}
