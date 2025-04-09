const mongoose = require('mongoose')

const viewSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
    },
    videoId:{
        type:mongoose.Schema.ObjectId,
        ref: 'Video',
        required: true,
    }
},{timestamps:true})

module.exports = mongoose.model("View", viewSchema);
