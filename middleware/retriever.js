const User = require("../models/userModel");
const Post = require("../models/postModel");
const Game = require("../models/gamingModel");
const Tech = require("../models/techmodel");
const Lifestyle = require("../models/lifestyleModel");
const Music = require("../models/musicModel");

async function retrievePost(req, res, next) {
  let post;
  try {
    post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({ message: "Post not found." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  res.post = post;
  next();
}

async function retrieveUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  res.user = user;
  next();
}

async function retrieveGame(req, res, next) {
  let game;
  try {
    game = await Game.findById(req.params.id);
    if (!game) {
      return res.status(404).send({ message: "Games not found." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  res.game = game;
  next();
}

async function retrieveTech(req, res, next) {
  let tech;
  try {
    tech = await Tech.findById(req.params.id);
    if (!tech) {
      return res.status(404).send({ message: "Technology not found." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  res.tech = tech;
  next();
}

async function retrieveLifestyle(req, res, next) {
  let lifestyle;
  try {
    lifestyle = await Lifestyle.findById(req.params.id);
    if (!lifestyle) {
      return res.status(404).send({ message: "Lifestyle not found." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  res.lifestyle = lifestyle;
  next();
}

async function retrieveMusic(req, res, next) {
  let music;
  try {
    music = await Music.findById(req.params.id);
    if (!music) {
      return res.status(404).send({ message: "Music not found." });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  res.music = music;
  next();
}

module.exports = {
  retrievePost: retrievePost,
  retrieveUser: retrieveUser,
  retrieveGame: retrieveGame,
  retrieveTech: retrieveTech,
  retrieveLifestyle: retrieveLifestyle,
  retrieveMusic: retrieveMusic,
};
