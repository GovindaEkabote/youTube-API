const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");
const Video = require("../Model/video.model");
const User = require("../Model/user.model");
const Comment = require("../Model/comment.model");

exports.createComment = tryCatchError(async (req, res, next) => {
  const { videoId, content } = req.body;
  if (!req.user || !req.user.id || !videoId || !content) {
    return next(
      new ErrorHandler("user ID and Vide Id and content are required", 400)
    );
  }
  const newComment = new Comment({
    userId: req.user.id,
    videoId,
    content,
  });

  await newComment.save();
  res.status(200).json({message:"Comment added successfully",newComment})
});


exports.getAllComments = tryCatchError(async(req,res,next) =>{
    const videoId = req.params.videoId;
    const comments = await Comment.find({videoId}).populate('userId','username');
    res.status(200).json({
        success:true,
        comments : comments.map((comment) =>({
            username:comment.userId.username,
            content:comment.content
        }))
    })
})