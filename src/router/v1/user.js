const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers/index");

router.post("/signUp", userController.signUp);
router.post("/userLogin", userController.userLogin);
router.get("/profile/:id", userController.viewProfile);

module.exports = router;
