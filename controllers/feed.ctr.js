const { validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1290hv83480",
        title: "First Post",
        content: "This is the first post!",
        imageUrl: "images/pluginIcon.png",
        creator: {
          name: "Olek",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(402)
      .json({ message: "Validation error!", error: errors.toArray() });
  }
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "Post created successfully!",
    post: {
      _id: new Date().toISOString(),
      title,
      content,
      creator: {
        name: "Olek",
      },
      createdAt: new Date(),
    },
  });
};
