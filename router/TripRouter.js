const router = require('express').Router();
const TripController = require('../controllers/TripController')

router.post('/', TripController.createTrip);

module.exports = router;