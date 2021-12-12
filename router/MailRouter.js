const router = require('express').Router();
const MailController = require('../controllers/MailController')

router.get('/:userId', MailController.sendMail);

module.exports = router;