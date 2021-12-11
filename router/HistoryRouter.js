const router = require('express').Router();
const HistoryController = require('../controllers/HistoryController')
const AuthorizeAdmin = require('../middlewares/AuthorizeAdmin')

router.get('/', AuthorizeAdmin, HistoryController.getHistory);

module.exports = router;