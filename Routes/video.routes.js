const express = require("express");
const upload = require("../utils/uploadVideo");
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const fileUpload = require("../Middleware/fileUploadMiddleware");
const {
  videoUpload,
  myVideos,
  deleteVideo,
  updateVideo,
} = require("../Controllers/video.controller");

const router = express.Router();

// Use upload.fields() to handle both video and thumbnail
router
  .route("/video-upload")
  .post(IsAuthenticatedUser, fileUpload, videoUpload);

router.route("/videos").get(IsAuthenticatedUser, myVideos);
router.route("/video/:id").delete(IsAuthenticatedUser, deleteVideo);
router.route("/update-video/:id").put(IsAuthenticatedUser, upload.single("thumbnail"), updateVideo);

module.exports = router;
