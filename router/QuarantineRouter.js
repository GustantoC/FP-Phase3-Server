const router = require('express').Router();
const QuarantineController = require('../controllers/QuarantineController');

router.post('/:userId/:locationId', QuarantineController.createQuarantineDetail);
router.put('/:userId', QuarantineController.updateQuarantineDetail);

module.exports = router;