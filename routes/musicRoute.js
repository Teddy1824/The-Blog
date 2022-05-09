const router = require("express").Router();
const music = require("../models/musicModel");
const { retrieveMusic } = require("../middleware/retriever");
const { retrieveUser } = require("../middleware/retriever");
const verifyAcc = require("../middleware/authJWT");



router.get("/", async (req, res) => {
    try {
      const musics = await music.find();
      res.send(musics);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.get("/:id", retrieveMusic, (req, res) => {
    res.send(res.music);
  });
  
  router.post("/music", [verifyAcc, retrieveUser], async (req, res) => {
    let userName = res.user.username;
    let userProfile = res.user.profile;
    const newGame = new game({
      main_image: req.body.main_image,
      title: req.body.title,
      subtitle: req.body.subtitle,
      desc: req.body.desc,
      created_by: userName,
      user_image: userProfile,
      category: req.body.category,
    });
    try {
      await newMusic.save();
      res.status(200).send(newMusic);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  module.exports = router;