const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "userAvatars",
    fileFormats: ["jpg", "png", "jpeg"],
    transformation: [
      {
        width: 500,
        height: 500,
        crop: "limit",
      },
    ],
  },
});

const upload = multer({storage});
module.exports = upload;

/*
// Delete old avatar if exists
if (user.avatar.public_id) {
  await cloudinary.uploader.destroy(user.avatar.public_id);
}
*/