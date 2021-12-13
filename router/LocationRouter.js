const router = require('express').Router();
const LocationController = require('../controllers/LocationController');
const AuthorizeAdmin = require('../middlewares/AuthorizeAdmin');

router.get('/', LocationController.getAllLocations);
router.get('/:userId', LocationController.getUserLocation);
router.post('/', AuthorizeAdmin, LocationController.createNewLocation);
router.put('/:id',AuthorizeAdmin, LocationController.updateLocation);

module.exports = router;