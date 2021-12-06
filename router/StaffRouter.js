const router = require('express').Router();
const UserController = require('../controllers/UserController')

router.post('/', UserController.createStaff);
router.put('/:id', UserController.changeStaffRole);

module.exports = router;