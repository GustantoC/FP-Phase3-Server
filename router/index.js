const router = require("express").Router();
const UserRouter = require("./UserRouter");
const TripRouter = require("./TripRouter");
const StaffRouter = require("./StaffRouter");
const HistoryRouter = require("./HistoryRouter");
const LocationRouter = require("./LocationRouter");
const QuarantineRouter = require("./QuarantineRouter");
const Authentication = require("../middlewares/Authentication");
const ErrorHandler = require("../middlewares/ErrorHandler");
const UserController = require("../controllers/UserController");

<<<<<<< HEAD
router.get("/", (_, res) => {
  res.json({ message: "Welcome to the API" });
});
router.post("/regisAdmin", UserController.regisAdmin);
router.post("/register", UserController.createUser);
router.post("/login", UserController.Login);
router.use(Authentication);
router.use("/users", UserRouter);
router.use("/staffs", StaffRouter);
router.use("/histories", HistoryRouter);
router.use("/locations", LocationRouter);
router.use("/quarantines", QuarantineRouter);
router.use(ErrorHandler);
=======

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the API' })
})
router.post('/register',UserController.createUser)
router.post('/login', UserController.Login)
router.use(Authentication)
router.use('/users', UserRouter)
router.use('/trips', TripRouter)
router.use('/staffs', StaffRouter)
router.use('/histories', HistoryRouter)
router.use('/locations', LocationRouter)
router.use('/quarantines', QuarantineRouter)
router.use(ErrorHandler)
>>>>>>> 97a5a73520f4afc7161bc4b9fb594ed304a3626b

module.exports = router;
