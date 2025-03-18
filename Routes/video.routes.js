const express = require("express");
const upload = require("../utils/uploadVideo"); // Use upload.fields()
const { IsAuthenticatedUser } = require("../Middleware/Auth");
const { videoUpload } = require("../Controllers/video.controller");

const router = express.Router();

// Use upload.fields() to handle both video and thumbnail
router.route("/video-upload").post(
  IsAuthenticatedUser,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 },
  ]),
  videoUpload
);

module.exports = router;
