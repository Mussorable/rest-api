const express = require("express");
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed.route");

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Authorization");
  next();
});
app.use("/feed", feedRoutes);

app.listen(5173);
