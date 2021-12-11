const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.changeStatus);

module.exports = router;
