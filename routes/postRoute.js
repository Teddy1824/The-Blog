const router = require("express").Router();
const post = require("../models/postModel");
const { retrievePost } = require("../middleware/retriever");
const { retrieveUser } = require("../middleware/retriever");
const verifyAcc = require("../middleware/authJWT");


//Blog posts

router.get("/", async (req, res) => {
  try {
    const posts = await post.find();
    res.send(posts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", retrievePost, (req, res) => {
  res.send(res.post);
});

router.post("/create", [verifyAcc, retrieveUser], async (req, res) => {
  let userName = res.user.username;
  let userProfile = res.user.profile;
  const newPost = new post({
    main_image: req.body.main_image,
    title: req.body.title,
    subtitle: req.body.subtitle,
    desc: req.body.desc,
    created_by: userName,
    user_image: userProfile,
    category: req.body.category,
  });
  try {
    await newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.put(
  "/:id",
  [verifyAcc, retrievePost, retrieveUser],
  async (req, res) => {
    if (res.user.username !== res.post.created_by) {
      return res
        .status(401)
        .send({ message: "You are not authorized to edit this post." });
    }
    if (req.body.main_image != null) res.post.main_image = req.body.main_image;
    if (req.body.title != null) res.post.title = req.body.title;
    if (req.body.subtitle != null) res.post.subtitle = req.body.subtitle;
    if (req.body.desc != null) res.post.desc = req.body.desc;
    if (req.body.created_by != null) res.post.created_by = res.user.username;
    try {
      const updatedPost = await res.post.save();
      res.send(updatedPost);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
);

router.delete(
  "/:id",
  [verifyAcc, retrievePost, retrieveUser],
  async (req, res) => {
    if (res.user.username !== res.post.created_by) {
      return res
        .status(401)
        .send({ message: "You are not authorized to delete this post." });
    }
    try {
      await res.post.remove();
      res.status(200).send({ message: "Post deleted successfully." });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
);

//Add Reaction
router.post("/:id/reaction", [verifyAcc, retrieveUser], async (req, res, next) => {
  const{reaction} = req.body;
  const post = await this.post.findById(req.params.id);

  const InCart = cart.some((item) => {
    return item._id.toString() == users._id.toString();
  });
  if(inCart) {
    const cartItem = cart.find(
      (item) => item._id.toString() === users._id.toString()
    );
    cartItem.quantity += quantity;
  }else {
    const cartItem = { ...users._doc, quantity };
    cart.push(cartItem);
  }
  try {
    res.users.markModified("liked_by");
    const updatedUser = await res.users.save();
    res.stsus(200).json({ cart: updatedUser.cart });
  } catch (err) {
console.log(err)
  }
});

module.exports = router;
