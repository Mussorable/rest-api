const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const feedRoutes = require("./routes/feed.route");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
    return res.status(200).json({});
  }
  next();
});
app.use("/feed", feedRoutes);
app.use((error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message });
});

mongoose
  .connect(
    "mongodb+srv://Mussorable:qChxEQN1Q6rlS4Mg@cluster0.i83bgon.mongodb.net/messages?"
  )
  .then(() => app.listen(5173))
  .catch((error) => console.error(error));
