const express = require("express");
const router = express.Router();

const { userController } = require("../../controllers/index");

router.post("/signUp", userController.signUp);
router.post("/userLogin", userController.userLogin);
router.get("/profile/:id", userController.viewProfile);
router.patch("/updateUser/:id",userController.updateDetails);
router.delete("/deleteUser/:id",userController.deleteProfile);

module.exports = router;
