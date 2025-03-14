const mongoose = require("mongoose");

const videoUploadSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  thubnailUrl: {
    type: String,
    required: true,
    trim: true,
  },
  thubnailId: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: String,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  disLikes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  likeBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  disLikesBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  viewsBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},{timestamps:true});

const uploadVideo = mongoose.model("videoUpload", videoUploadSchema);
module.exports = uploadVideo;
