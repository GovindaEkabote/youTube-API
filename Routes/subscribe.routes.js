const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const { scbscribeChannel, unSubscribe, allSubscribeChannel, getchannelbyId, getSubscriberCount } = require("../Controllers/subscribe.controller");
const router = express.Router();



router.route('/subscribe/:channelId').post(IsAuthenticatedUser,scbscribeChannel)
router.route('/unsubscribe/:channelId').delete(IsAuthenticatedUser,unSubscribe)
router.route('/mysubscribe').get(IsAuthenticatedUser,allSubscribeChannel)
router.route('/channel/:channelId').get(IsAuthenticatedUser,getchannelbyId)
router.route('/subscriptions/count/:channelId').get(IsAuthenticatedUser,getSubscriberCount)

module.exports = router;
