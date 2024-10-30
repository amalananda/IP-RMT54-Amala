const { Destination } = require("../models")

module.exports = class DestinationController {
  static async getDestinations(req, res) {
    try {
      const destinations = await Destination.findAll()
      res.status(200).json(destinations)
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve destinations' })
    }
  }
  static async getDestinationById(req, res) {
    try {
      const destination = await Destination.findByPk(req.params.id)
      if (!destination) return res.status(404).json({ error: 'Destination not found' })
      res.status(200).json(destination)
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve destinations' })
    }
  }
}
