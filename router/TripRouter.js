const router = require('express').Router();
const TripController = require('../controllers/TripController')

router.get('/', TripController.getAllTrips);
router.post('/', TripController.createTrip);

module.exports = router;