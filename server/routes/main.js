const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const locals = {
      title: "KnowledgeShare",
      description: "Simple blog created using NodejS, Express, and MongoDb.",
    };
    let perPage = 5;
    let page = req.query.page || 1; // if no page number then search for 1
    const posts = await Post.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    // const posts = await Post.find({});
    res.render("index", {
      locals,
      posts,
      current: page,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
