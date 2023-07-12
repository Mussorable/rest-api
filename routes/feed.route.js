const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const feedController = require("../controllers/feed.ctr");
const isAuth = require("../middleware/is-auth.md");

router.get("/posts", isAuth, feedController.getPosts);
router.post(
  "/post",
  isAuth,
  [
    body("title").trim().isLength({ min: 5 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);
router.get("/post/:postId", isAuth, feedController.getPost);
router.delete("/post/:postId", isAuth, feedController.deletePost);

module.exports = router;
