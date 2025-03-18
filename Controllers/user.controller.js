const express = require("express");
const User = require("../Model/user.model");
const ErrroHandler = require("../utils/ErrorHandling");
const sendToken = require("../utils/sendTokens");
const tryCatchError = require("../Middleware/tryCatch");
const cloudinary = require("../config/cloudinary");
const bcrypt = require("bcrypt");

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

exports.login = tryCatchError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrroHandler("Please Enter Email and Password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrroHandler("Invalid Email and Password"));
  }
  const passwordCompare = await user.comparePassword(password);
  if (!passwordCompare) {
    return next(new ErrroHandler("Invalid Email and Password"));
  }
  sendToken(user, 200, res);
});

exports.logout = tryCatchError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    HttpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});

exports.userDetails = tryCatchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrroHandler("User Not Found", 404));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUerPassword = tryCatchError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatch = await user.comparePassword(req.body.oldPpassword);

  if (!isPasswordMatch) {
    return next(new ErrroHandler("Old Password is incorrect", 400));
  }
  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrroHandler("Password does not match", 400));
  }
  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, 200, res);
});

exports.updateAvatar = tryCatchError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new ErrroHandler("User Not Found", 404));
  }

  if (!req.file) {
    return next(new ErrroHandler("Please upload an image", 400));
  }

  // Delete the old avatar from Cloudinary if it exists
  if (user.avatar && user.avatar.public_id) {
    await cloudinary.uploader.destroy(user.avatar.public_id);
  }

  try {
    // Upload new avatar to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "avatars",
      width: 500,
      crop: "scale",
    });

    // Update user avatar details
    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };

    // Save updated user details
    await user.save();

    // Send response with updated token
    sendToken(user, 200, res);
  } catch (error) {
    return next(new ErrorHandler("Image upload failed. Try again.", 500));
  }
});

exports.updateProfile = tryCatchError(async (req, res, next) => {
  const { username, email } = req.body;
  const user = await User.findById(req.user.id);
  user.username = username || user.username;
  user.email = email || user.email;
  await user.save();
  return sendToken(user, 200, res);
});

exports.deleteAccount = tryCatchError(async (req, res, next) => {
  const {id} = req.params;
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrroHandler("User not found", 400));
  }
  await User.deleteOne({ _id: id });
  res.status(200).json({
    success: true,
    message: "User delete Successfuly",
  });
});
