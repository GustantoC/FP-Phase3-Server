const router = require('express').Router();
const LocationController = require('../controllers/locationController');
const AuthorizeAdmin = require('../middlewares/authorizeAdmin');

router.get('/', LocationController.getAllLocations);
router.get('/:userId', LocationController.getUserLocation);
router.post('/', AuthorizeAdmin, LocationController.createNewLocation);
router.put('/:id',AuthorizeAdmin, LocationController.updateLocation);

module.exports = router;