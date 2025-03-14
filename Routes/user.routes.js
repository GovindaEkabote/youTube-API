const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../Model/user.model");
const pLimit = require("p-limit");
const mongoose = require("mongoose");
const cloudinary = require("../config/cloudinary");
const sentToken = require('../utils/sendTokens');
const ErrorHandler = require("../utils/ErrorHandling");
const router = express.Router();

router.post("/signup", async (req, res,next) => {
  try {
    const limit = pLimit(2);

    // Validate images array
    if (!req.body.images || !Array.isArray(req.body.images)) {
      return next(new ErrorHandler("Invalid images array",400))
    }

    // Upload images to Cloudinary concurrently with limit
    const imagesToUpload = req.body.images.map((image) =>
      limit(async () => {
        try {
          return await cloudinary.uploader.upload(image);
        } catch (error) {
          return { error: error.message }; // Capture individual errors
        }
      })
    );

    const uploadStatus = await Promise.all(imagesToUpload);

    // Extract successful image URLs and filter out failed uploads
    const uploadedImages = uploadStatus
      .filter((item) => !item.error)
      .map((item) => ({
        public_id: item.public_id,
        url: item.secure_url,
      }));

    // If all uploads failed
    if (uploadedImages.length === 0) {
      return res.status(500).json({
        message: "Images upload failed",
        success: false,
        errors: uploadStatus.filter((item) => item.error),
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const existEmail = await User.findOne({email:req.body.email})
    if(existEmail){
      return res.status(500).json({message:"Email Already Exist Please Login"})
    }
    // Create a new user object
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      channelName: req.body.channelName,
      email: existEmail,
      phone: req.body.phone,
      password: hashedPassword,
      images: uploadedImages, // Store array of image objects
      logoId: uploadedImages[0]?.public_id || "", // Set the first image as logoId
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res,next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return  next(new ErrorHandler("Please Enter Email and Password", 400));
       }
    const login = await User.findOne({ email }).select("+password")
    if (!login) {
      return next(new ErrorHandler("Invalid Email and Password", 400));
    }
    const haspPassword = await bcrypt.compare(password, login.password);
    if (!haspPassword) {
      return next(new ErrorHandler("Invalid Email and Password", 400));
    }
   sentToken(login,200,res)
  } catch (error) {
    console.log(error);
  }
});

/*
Pending API's
1.Logout
2. Change Password   
3. Forgot Password  (Node Mailer)
4. Update User Profile
5. Delete User Profilr 

*/

module.exports = router;
