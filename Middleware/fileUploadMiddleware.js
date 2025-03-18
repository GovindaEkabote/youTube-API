const upload = require("../utils/uploadVideo");

const handleFileUpload = upload.fields([
  { name: "video", maxCount: 1 },
  { name: "thumbnail", maxCount: 1 },
]);

module.exports = handleFileUpload;
