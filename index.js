const express = require("express");
const connectDB = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/"
}));
app.use(cookieParser());
app.use(bodyParser.json());


const userRegister = require("./Routes/user.routes");
app.use("/api/v1", userRegister);
const videoUploder = require("./Routes/video.routes");
app.use("/api/v1", videoUploder);

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
