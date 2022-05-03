const router = require("express").Router();
const game = require("../models/gamingModel");
const { retrieveGame } = require("../middleware/retriever");
const { retrieveUser } = require("../middleware/retriever");
const verifyAcc = require("../middleware/authJWT");


router.get("/", async (req, res) => {
    try {
      const games = await game.find();
      res.send(games);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.get("/:id", retrieveGame, (req, res) => {
    res.send(res.game);
  });
  
  router.post("/games", [verifyAcc, retrieveUser], async (req, res) => {
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
      await newGame.save();
      res.status(200).send(newGame);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  module.exports = router;