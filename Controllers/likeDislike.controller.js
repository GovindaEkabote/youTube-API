const LikeDislike = require("../Model/likedislike.model");
const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");
const Video = require('../Model/video.model')
const Comment = require('../Model/comment.model')


exports.likeVideo = tryCatchError(async (req, res, next) => {
  const { videoId } = req.body;
  const video = await Video.findById(videoId);
  if (!video) {
    return next(new ErrorHandler("video Not Found", 404));
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
    message: "Video disliked successfully",
    likeCount: video.dislikeCount,
  });

});

exports.likeComment = tryCatchError(async (req, res, next) => {
  const { commentId } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new ErrorHandler("comment Not Found", 404));
  }

  const existingLike = await LikeDislike.findOne({
    userId:req.user.id,
    commentId,
  });
  if(existingLike){
    if(existingLike.like_dislike === 'like'){
      await existingLike.deleteOne();
      comment.likeCount = Math.max(0,comment.likeCount -1)
      await comment.save();

     return res.status(200).json({
        success: true,
        message: "Comment unliked successfully",
        likeCount: comment.likeCount,
      });
    }else{
      existingLike.like_dislike = 'like'
      await existingLike.save();
      comment.likeCount += 1;
      comment.dislikeCount = Math.max(0,(comment.dislikeCount || 0)  -1);
      await comment.save();
     return res.status(200).json({
        success: true,
        message: "Comment dis to liked successfully",
        likeCount: comment.likeCount,
        dislikeCount: comment.dislikeCount,
      });
    }
  }else{
    await LikeDislike.create({
      userId:req.user.id,
      commentId,
      like_dislike:'like',
    });
    comment.likeCount += 1;
    await comment.save();
  }
  return res.status(200).json({
    success: true,
    message: "comment liked successfully",
    likeCount: comment.likeCount,
  });

});

exports.dislikeComment = tryCatchError(async (req, res, next) => {
  const { commentId } = req.body;
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return next(new ErrorHandler("comment Not Found", 404));
  } 
  
  const existingLike = await LikeDislike.findOne({
    userId:req.user.id,
    commentId,
  });
  if(existingLike){
    if(existingLike.like_dislike === 'dislike'){
      await existingLike.deleteOne();
      comment.dislikeCount = Math.max(0,comment.dislikeCount -1)
      await comment.save();

     return res.status(200).json({
        success: true,
        message: "comment undislike successfully",
        dislikeCount: comment.dislikeCount,
      });
    }else{
      existingLike.like_dislike = 'dislike'
      await existingLike.save();
      comment.dislikeCount += 1;
      comment.likeCount = Math.max(0, comment.likeCount - 1);
      await comment.save();
     return res.status(200).json({
        success: true,
        message: "comment dislike to undislike successfully",
        likeCount: comment.likeCount,
        dislikeCount: comment.dislikeCount,
      });
    }
  }else{
    await LikeDislike.create({
      userId:req.user.id,
      commentId,
      like_dislike:'dislike',
    });
    comment.dislikeCount  += 1;
    await comment.save();
  }
  return res.status(200).json({
    success: true,
    message: "comment  disliked successfully",
    likeCount: comment.dislikeCount,
  });

});