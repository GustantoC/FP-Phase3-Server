const router = require('express').Router();
const HistoryController = require('../controllers/HistoryController')

router.get('/', HistoryController.getHistory);
router.get('/:id', HistoryController.getHistoryByUser);

module.exports = router;