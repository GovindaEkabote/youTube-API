const express = require("express");
const { view } = require("../Controllers/view.controller");
const { IsAuthenticatedUser } = require("../Middleware/Auth");

const router = express.Router();


router.route('/view').post(IsAuthenticatedUser,view)

module.exports = router;
