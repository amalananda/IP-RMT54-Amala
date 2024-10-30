const router = require('express').Router()
const TripController = require('../controllers/tripController')

// Mendapatkan semua trip beserta destinasi terkait
router.get('/trip', TripController.getTrips)
// Membuat trip baru dan menyimpan destinasi terkait
router.post('/trip', TripController.createTrip)
// Mendapatkan trip berdasarkan ID beserta destinasi terkait
router.get('/trip/:id', TripController.getTripById)
// Memperbarui trip berdasarkan ID dan destinasi terkait
router.put('/trip/:id', TripController.updateTrip)
module.exports = router
