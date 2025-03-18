const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");
const Video = require("../Model/video.model");

exports.videoUpload = tryCatchError(async (req, res, next) => {
  try {
    if (!req.files || !req.files.video || req.files.video.length === 0) {
      return next(new ErrorHandler("No Video File Found"));
    }

    // Correct file path
    const videoUrl = `/public/uploads/videos/${req.files.video[0].filename}`;
    const thumbnailUrl = req.files.thumbnail
      ? `/public/uploads/thumbnails/${req.files.thumbnail[0].filename}`
      : ""; // Optional thumbnail

    const newVideoUpload = new Video({
      title: req.body.title,
      description: req.body.description,
      videoUrl: videoUrl,
      thumbnailUrl: thumbnailUrl,
      duration: req.body.duration,
      userId: req.user.id,
    });

    await newVideoUpload.save();
    res.status(200).json({ message: "Video Uploaded Successfully", newVideoUpload });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});
