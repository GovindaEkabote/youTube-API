const express = require("express");
const upload = require("../Middleware/upload");
const { register, login, logout } = require("../Controllers/user.controller");
const router = express.Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);
router.route("/logout").post(logout)

module.exports = router;
