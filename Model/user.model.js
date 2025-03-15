const mongoose = require("mongoose");
const jwt =  require('jsonwebtoken')
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    channelName: {
      type: String, 
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    logoId: {
      type: String,
      required: true,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedChannels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    referenceToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
userSchema.methods.getJWTToken = function () {
  if (!process.env.JWT) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id: this._id }, process.env.JWT, {
    expiresIn: process.env.EXPIREIN,
  });
};

// Reference Token Generate
userSchema.methods.getReferenceToken = async function () {
  const referenceToken = crypto.randomBytes(32).toString("hex");
  this.referenceToken = referenceToken;
  await this.save();
  return referenceToken;
};

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;

/*JWT
EXPIREIN*/