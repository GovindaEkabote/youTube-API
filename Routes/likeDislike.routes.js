const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const {
  likeVideo,
  dislikeVideo,
  likeComment,
  dislikeComment,
} = require("../Controllers/likeDislike.controller");
const router = express.Router();

router.route("/like").post(IsAuthenticatedUser, likeVideo);
router.route("/dislike").post(IsAuthenticatedUser, dislikeVideo);
router.route("/likecomment").post(IsAuthenticatedUser, likeComment);
router.route("/dislikecomment").post(IsAuthenticatedUser, dislikeComment);

module.exports = router;
