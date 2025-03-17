const express = require("express");
const User = require("../Model/user.model");
const ErrroHandler = require("../utils/ErrorHandling");
const sendToken = require("../utils/sendTokens");
const tryCatchError = require("../Middleware/tryCatch");
const cloudinary = require("../config/cloudinary");

exports.register = tryCatchError(async (req, res, next) => {
    const { username, email, password } = req.body;
    let avatar = {
      public_id: "DefaultAvatar",
      url: "https://res.cloudinary.com/demo/image/upload/v1589811348/default_avatar.png",
    };

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "avatars",
          width: 500,
          crop: "scale",
        });

        avatar = {
          public_id: result.public_id,
          url: result.secure_url,
        };
      } catch (error) {
        return next(new ErrroHandler("Image upload failed. Try again.", 500));
      }
    }

    // Create a new user
    const user = await User.create({
      username,
      email,
      password,
      avatar,
    });

    sendToken(user, 201, res);
});

