const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    channelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

const subscription = mongoose.model('Subscription', subscribeSchema)
module.exports = subscription