const mongoose = require("mongoose");

const likeDislikeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
   required: false,
  },
  commentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    required: false,
  },
  like_dislike:{
    type: Number,
    enum: ['like', 'dislike'], 
    required:true
  },
},{timestamps:true});

const LikeDislike = mongoose.model("LikeDislike", likeDislikeSchema);
module.exports = LikeDislike;
