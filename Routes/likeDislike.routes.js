const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const {
  likeVideo,
  dislikeVideo,
  likeComment,
} = require("../Controllers/likeDislike.controller");
const router = express.Router();

router.route("/like").post(IsAuthenticatedUser, likeVideo);
router.route("/dislike").post(IsAuthenticatedUser, dislikeVideo);
router.route("/likecomment").post(IsAuthenticatedUser, likeComment);

module.exports = router;
