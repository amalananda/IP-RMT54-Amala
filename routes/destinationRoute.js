const DestinationController = require('../controllers/destinationController')
const router = require('express').Router()

router.get('/destination', DestinationController.getDestinations)
router.get('/destination/:id', DestinationController.getDestinationById)


module.exports = router
