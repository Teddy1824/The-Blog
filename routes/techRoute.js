const router = require("express").Router();
const tech = require("../models/techmodel");
const { retrieveTech } = require("../middleware/retriever");
const { retrieveUser } = require("../middleware/retriever");
const verifyAcc = require("../middleware/authJWT");


router.get("/", async (req, res) => {
    try {
      const technology = await tech.find();
      res.send(technology);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  });

  router.get("/:id", retrieveTech, (req, res) => {
    res.send(res.tech);
  });
  
  router.post("/technology", [verifyAcc, retrieveUser], async (req, res) => {
    let userName = res.user.username;
    let userProfile = res.user.profile;
    const newTech = new tech({
      main_image: req.body.main_image,
      title: req.body.title,
      subtitle: req.body.subtitle,
      desc: req.body.desc,
      created_by: userName,
      user_image: userProfile,
      category: req.body.category,
    });
    try {
      await newTech.save();
      res.status(200).send(newTech);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

  module.exports = router;