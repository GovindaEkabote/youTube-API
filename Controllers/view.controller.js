const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");
const View = require('../Model/view.model')
const Video = require('../Model/video.model')


exports.view = tryCatchError(async(req,resizeBy,next) =>{
    const {videoId} = req.body;
    const userId = req.user.id;
    const existingView = await View.findOne({ userId, videoId });
    if (existingView) {
      return res.status(200).json({ message: "View already recorded" });
    }
    const newView = await View.create({
      userId: userId ,
      videoId,
    });
    await Video.findByIdAndUpdate(videoId, {
      $inc: { viewsCount: 1 },
    });
    res.status(201).json({ message: "View recorded", view: newView });
})