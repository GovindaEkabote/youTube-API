const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const { createComment, getAllComments } = require("../Controllers/comment.controller");
const router = express.Router();


router.route('/comment').post(IsAuthenticatedUser,createComment)
router.route('/comment/:videoId').get(IsAuthenticatedUser,getAllComments)

module.exports = router;
