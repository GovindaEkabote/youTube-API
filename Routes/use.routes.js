const express = require("express");
const upload = require("../Middleware/upload");
const {
  register,
  login,
  logout,
  userDetails,
  updateUerPassword,
  updateAvatar,
} = require("../Controllers/user.controller");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const router = express.Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").post(logout);

router.route("/user").get(IsAuthenticatedUser, userDetails);
router.route("/updare-password").put(IsAuthenticatedUser, updateUerPassword);
router
  .route("/update-profile")
  .put(upload.single("avatar"), IsAuthenticatedUser, updateAvatar);

module.exports = router;
