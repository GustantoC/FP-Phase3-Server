const router = require('express').Router();
const QuarantineController = require('../controllers/QuarantineController');


router.get('/', QuarantineController.getAllQuarantineDetails);
//Officer doang yang bisa akses ini
router.put('/:userId', QuarantineController.updateQuarantineDetail);

module.exports = router;