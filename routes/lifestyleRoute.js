const router = require("express").Router();
const lifestyle = require("../models/lifestyleModel");
const { retrievePost } = require("../middleware/retriever");
const { retrieveUser } = require("../middleware/retriever");
const verifyAcc = require("../middleware/authJWT");


router.get("/", async (req, res) => {
    try {
      const lifestyles = await lifestyle.find();
      res.send(lifestyles);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.get("/:id", retrievePost, (req, res) => {
    res.send(res.lifestyle);
  });
  
  router.post("/lifestyles", [verifyAcc, retrieveUser], async (req, res) => {
    let userName = res.user.username;
    let userProfile = res.user.profile;
    const newLifestyle = new lifestyle({
      main_image: req.body.main_image,
      title: req.body.title,
      subtitle: req.body.subtitle,
      desc: req.body.desc,
      created_by: userName,
      user_image: userProfile,
      category: req.body.category,
    });
    try {
      await newLifestyle.save();
      res.status(200).send(newLifestyle);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  module.exports = router;