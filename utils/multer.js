const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const fs = require("fs");

const uploadPath = "./public/uploads";

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isVideo = /mp4|mkv|mov|avi/.test(file.mimetype);
    const isImage = /jpeg|jpg|png/.test(file.mimetype);

    let folder = isVideo ? "videos" : isImage ? "thumbnails" : "others";

    const finalPath = `${uploadPath}/${folder}`;
    if (!fs.existsSync(finalPath)) {
      fs.mkdirSync(finalPath, { recursive: true });
    }
    cb(null, finalPath);
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(12, function (err, buffer) {
      if (err) return cb(err);
      const fileName = buffer.toString("hex") + path.extname(file.originalname);
      cb(null, fileName);
    });
  },
});

const upload = multer({ storage });

module.exports = upload;
