const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const feedRoutes = require("./routes/feed.route");
const authRoutes = require("./routes/auth.route");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    callback(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
    return res.status(200).json({});
  }
  next();
});
app.use("/feed", feedRoutes);
app.use("/auth", authRoutes);
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb+srv://Mussorable:qChxEQN1Q6rlS4Mg@cluster0.i83bgon.mongodb.net/messages?"
  )
  .then(() => app.listen(5173))
  .catch((error) => console.error(error));
