const ErrorHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");
const View = require('../Model/view.model')
const Video = require('../Model/video.model')


exports.view = tryCatchError(async(req,res,next) =>{
    const {videoId} = req.body;
    const existingView = await View.findOne({ userId : req.user.id, videoId });
    if (existingView) {
      return next(new ErrorHandler({message: "View already recorded" }));
    }
    const newView = await View.create({
        userId : req.user.id,
      videoId,
    });
    await Video.findByIdAndUpdate(videoId, {
      $inc: { viewsCount: 1 },
    });
    res.status(201).json({ message: "View recorded", view: newView });
})