const express = require("express");
const connectDB = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("public/uploads"));

// Import Routes
const userRegister = require("./Routes/user.routes");
app.use("/api/v1", userRegister);

const videoUploader = require("./Routes/video.routes");
app.use("/api/v1", videoUploader);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
