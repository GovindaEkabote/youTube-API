const express = require("express");
const connectDB = require("./config/dbConfig");
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

app.use(bodyParser.json());


const userRegister = require("./Routes/user.routes");
app.use("/api/v1", userRegister);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
