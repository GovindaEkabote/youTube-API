const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");
const Video = require("../Model/video.model");
const fs = require("fs");
const path = require("path");

exports.videoUpload = tryCatchError(async (req, res, next) => {
  try {
    if (!req.files || !req.files.video || req.files.video.length === 0) {
      return next(new ErrorHandler("No Video File Found"));
    }

    // Correct file path
    const videoUrl = `D:/03_Projects/youtube-api/public/uploads/videos/${req.files.video[0].filename}`;
    const thumbnailUrl = req.files.thumbnail
      ? `D:/03_Projects/youtube-api/public/uploads/thumbnails/${req.files.thumbnail[0].filename}`
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
    await newVideoUpload.populate("userId", "username");

    res
      .status(200)
      .json({ message: "Video Uploaded Successfully", newVideoUpload });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

exports.myVideos = tryCatchError(async (req, res, next) => {
  const userId = req.user.id;
  const videos = await Video.find({ userId }).populate("userId", "username");
  res.status(200).json({
    success: true,
    videos: videos.map((video) => ({
      title: video.title,
      videoUrl: video.videoUrl,
      username: video.userId.username,
    })),
  });
});

exports.updateVideo = tryCatchError(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Find existing video
  const video = await Video.findById(id);
  if (!video) {
    return next(new ErrorHandler("Video Not Found", 404));
  }

  let uploadNewThumbnailUrl = video.thumbnailUrl; // Default: keep old thumbnail

  // Handle new thumbnail upload
  if (req.files?.thumbnail?.[0]) {
    try {
      // Remove old thumbnail if exists
      if (video.thumbnailUrl) {
        const oldThumbnailPath = path.resolve(video.thumbnailUrl);
        await fs.promises.unlink(oldThumbnailPath).catch((err) => {
          if (err.code !== "ENOENT") {
            console.error("Error deleting old thumbnail:", err);
          }
        });
      }

      // Save new thumbnail
      uploadNewThumbnailUrl = path.join(
        __dirname,
        "..",
        "public",
        "uploads",
        "thumbnails",
        req.files.thumbnail[0].filename
      );
    } catch (error) {
      console.error("Thumbnail update error:", error);
      return next(new ErrorHandler("Failed to update thumbnail", 500));
    }
  }

  // Update video details
  const updatedVideo = await Video.findByIdAndUpdate(
    id,
    {
      title: title ?? video.title, // Keep old title if not provided
      description: description ?? video.description, // Keep old description if not provided
      thumbnailUrl: uploadNewThumbnailUrl,
    },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Video updated successfully",
    video: updatedVideo,
  });
});

exports.deleteVideo = tryCatchError(async (req, res, next) => {
  const videoId = req.params.id;
  // Find the video in the database
  const video = await Video.findById({ _id: videoId });
  if (!video) {
    return next(new ErrorHandler("Video Not Found", 404));
  }

  // Extract video file path
  const videoPath = path.resolve(video.videoUrl); // Convert to absolute path
  const thumbnailPath = path.resolve(video.thumbnailUrl);
  // Delete video from database
  const deleteResult = await Video.deleteOne({ _id: videoId });

  if (deleteResult.deletedCount === 0) {
    return next(new ErrorHandler("Failed to delete video from database", 500));
  }

  // Remove video file from local storage
  const deleteFiles = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
  };
  deleteFiles(videoPath);
  if (thumbnailPath) deleteFiles(thumbnailPath);

  res.status(200).json({
    success: true,
    message: "Video deleted successfully from database and storage",
  });
});




/*
1. Search Video 
2. Sort Video Old and latest
3. get Video by it's ID
4. upload video for Premium members only
5. get single video 
*/