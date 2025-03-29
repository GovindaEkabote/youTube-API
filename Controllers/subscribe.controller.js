const Subscription = require("../Model/subscribe.model");
const ErrroHandler = require("../utils/ErrorHandling");
const tryCatchError = require("../Middleware/tryCatch");

exports.scbscribeChannel = tryCatchError(async (req, res, next) => {
  const { channelId } = req.params;
  if (req.user.id === channelId) {
    return next(
      new ErrroHandler("You can not subscribe you channel itself", 404)
    );
  }
  const existUser = await Subscription.findOne({
    userId: req.user.id,
    channelId: channelId,
  });
  if (existUser) {
    return next(new ErrroHandler("You already subscribe this channel", 400));
  }
  const subscribe = await Subscription.create({
    userId: req.user.id,
    channelId: channelId,
  })
  res.status(201).json({
    success: true,
    message: "Subscribed successfully!",
    subscribe
  })
});

exports.unSubscribe = tryCatchError(async(req,res,next) =>{
  const {channelId} = req.params;
  const subscription = await Subscription.findOneAndDelete({
    userId:req.user.id,
    channelId: channelId,
  })
  if(!subscription){
    return next(new ErrroHandler("You are not subscribed to this channel", 400));
  }
  res.status(200).json({
    success:true,
    message:"Unsubscribed successfully!",
  })
})

