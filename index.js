const express = require("express");
const connectDB = require("./config/dbConfig");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("public/uploads"));

const User = require('./Routes/use.routes');
app.use('/api/v1', User);

const Video = require('./Routes/video.routes');
app.use('/api/v1', Video);

const comment = require('./Routes/comment.routes');
app.use('/api/v1',comment)

const subscribe = require('./Routes/subscribe.routes');
app.use('/api/v1',subscribe)

const like = require('./Routes/likeDislike.routes');
app.use('/api/v1',like)

const view = require('./Routes/view.routes');
app.use('/api/v1',view)

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
