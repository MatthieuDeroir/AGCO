const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Inscription
router.post("/signup", async (req, res) => {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8); // Le '8' est le nombre de tours de salage
    const user = new User({
      ...req.body,
      password: hashedPassword,
    });
    await user.save();

    // Créer un token JWT
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Connexion
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(400).send("Invalid username or password");
    }
    
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid username or password");
    }

    // Créer un token JWT
    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
    res.status(200).send({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;