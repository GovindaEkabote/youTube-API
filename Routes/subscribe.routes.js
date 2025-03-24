const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const { scbscribeChannel } = require("../Controllers/subscribe.controller");
const router = express.Router();



router.route('/subscribe/:channelId').post(IsAuthenticatedUser,scbscribeChannel)

module.exports = router;
