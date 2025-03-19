const express = require("express");
const upload = require("../utils/uploadVideo");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const fileUpload = require("../Middleware/fileUploadMiddleware");
const { videoUpload, myVideos } = require("../Controllers/video.controller");

const router = express.Router();

// Use upload.fields() to handle both video and thumbnail
router
  .route("/video-upload")
  .post(IsAuthenticatedUser, fileUpload, videoUpload);

router.route('/videos').get(IsAuthenticatedUser,myVideos)

module.exports = router;
