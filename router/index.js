const router = require('express').Router();
const UserRouter = require('./UserRouter')

const Authentication = require('../middlewares/Authentication')
const ErrorHandler = require('../middlewares/ErrorHandler')
const UserController = require('../controllers/UserController')

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the API' })
})
router.use('/login', UserController.Login)
router.use(Authentication)
router.use('/users', UserRouter)
router.use('/histories', UserRouter)
router.use('/locations', UserRouter)
router.use(ErrorHandler)

module.exports = router