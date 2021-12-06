const router = require('express').Router();
const LocationController = require('../controllers/locationController');

router.get('/', LocationController.getAllLocations);
router.get('/:userId', LocationController.getUserLocation);
router.post('/', LocationController.createNewLocation);
router.post('/:userId/:locationId', LocationController.createUserLocation);
router.put('/:userId', LocationController.updateRoomNumber);

module.exports = router;