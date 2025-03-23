const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const {
  createComment,
  getAllComments,
  repliesComment,
  reply,
  editComment,
  editReplies,
} = require("../Controllers/comment.controller");
const router = express.Router();

router.route("/comment").post(IsAuthenticatedUser, createComment);
router.route("/comment/:videoId").get(IsAuthenticatedUser, getAllComments);

router
  .route("/comment/:commentId/reply")
  .get(IsAuthenticatedUser, repliesComment);
router.route("/comment/:commentId/reply").post(IsAuthenticatedUser, reply);
router.route("/edit/:id").put(IsAuthenticatedUser, editComment);
router.route("/edit-reply/:replyId").put(IsAuthenticatedUser, editReplies);


module.exports = router;
