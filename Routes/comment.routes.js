const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const {
  createComment,
  getAllComments,
  repliesComment,
  reply,
} = require("../Controllers/comment.controller");
const router = express.Router();

router.route("/comment").post(IsAuthenticatedUser, createComment);
router.route("/comment/:videoId").get(IsAuthenticatedUser, getAllComments);

router
  .route("/comment/:commentId/reply")
  .get(IsAuthenticatedUser, repliesComment);


router.route("/comment/:commentId/reply").post(IsAuthenticatedUser, reply);

module.exports = router;
