const LikeDislike = require("../Model/likedislike.model");
const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");
const Video = require('../Model/video.model')
const mongoose = require("mongoose");

exports.likeVideo = tryCatchError(async (req, res, next) => {
  const { videoId } = req.body;
  const video = await Video.findById(videoId);
  console.log("video");
  if (!video) {
    return next(new ErrorHandler("video Not Found", 404));
  }

  if (!mongoose.Types.ObjectId.isValid(videoId)) {
    return next(new ErrorHandler("Invalid video ID format", 400));
  }
  
  
  const existingLike = await LikeDislike.findOne({
    userId:req.user.id,
    videoId,
  });
  if(existingLike){
    if(existingLike.like_dislike === 'like'){
      await existingLike.deleteOne();
      video.likeCount = Math.max(0,video.likeCount -1)
      await video.save();

     return res.status(200).json({
        success: true,
        message: "video unliked successfully",
        likeCount: video.likeCount,
      });
    }else{
      existingLike.like_dislike = 'like'
      await existingLike.save();
      video.likeCount += 1;
      video.dislikeCount = Math.max(0,video.dislikeCount -1);
      await video.save();
     return res.status(200).json({
        success: true,
        message: "video dis to liked successfully",
        likeCount: video.likeCount,
        dislikeCount: video.dislikeCount,
      });
    }
  }else{
    await LikeDislike.create({
      userId:req.user.id,
      videoId,
      like_dislike:'like',
    });
    video.likeCount += 1;
    await video.save();
  }
  return res.status(200).json({
    success: true,
    message: "Video liked successfully",
    likeCount: video.likeCount,
  });

});

exports.dislikeVideo = tryCatchError(async (req, res, next) => {
  const { videoId } = req.body;
  const video = await Video.findById(videoId);
  console.log("video");
  if (!video) {
    return next(new ErrorHandler("video Not Found", 404));
  } 
  
  const existingLike = await LikeDislike.findOne({
    userId:req.user.id,
    videoId,
  });
  if(existingLike){
    if(existingLike.like_dislike === 'dislike'){
      await existingLike.deleteOne();
      video.dislikeCount = Math.max(0,video.dislikeCount -1)
      await video.save();

     return res.status(200).json({
        success: true,
        message: "video undislike successfully",
        dislikeCount: video.dislikeCount,
      });
    }else{
      existingLike.like_dislike = 'dislike'
      await existingLike.save();
      video.dislikeCount += 1;
      video.likeCount = Math.max(0, video.likeCount - 1);
      await video.save();
     return res.status(200).json({
        success: true,
        message: "video dislike to undislike successfully",
        likeCount: video.likeCount,
        dislikeCount: video.dislikeCount,
      });
    }
  }else{
    await LikeDislike.create({
      userId:req.user.id,
      videoId,
      like_dislike:'dislike',
    });
    video.dislikeCount  += 1;
    await video.save();
  }
  return res.status(200).json({
    success: true,
    message: "Video liked successfully",
    likeCount: video.dislikeCount,
  });

});
