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
  likedislike:{
    type: String,
    enum: ['like', 'dislike'], 
    Required:true
  },
  likes: {
  type: Number,
  default: 0,
},
dislikes: {
  type: Number,
  default: 0,
},
},{timestamps:true});

const LikeDislike = mongoose.model("LikeDislike", likeDislikeSchema);
module.exports = LikeDislike;
