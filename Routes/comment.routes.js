const express = require("express");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const { createComment } = require("../Controllers/comment.controller");
const router = express.Router();


router.route('/comment').post(IsAuthenticatedUser,createComment)

module.exports = router;
