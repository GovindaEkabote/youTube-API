const ErrroHandler = require("../utils/ErrorHandling");
const sendToken = require("../utils/sendTokens");
const tryCatchError = require("../Middleware/tryCatch");
const Video = require('../Model/video.model');

exports.videoUpload = tryCatchError(async(req,res,next) =>{
     
})