const userController = require("../controllers/user.controller");
const { auth } = require("../middleware/auth");

const router = require("express").Router();

router.post("/sign-up", userController.signUpUser);
router.post("/sign-in", userController.login);
router.get("/profile", auth, userController.userInfo);
module.exports = router;
