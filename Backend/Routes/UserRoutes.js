const express = require("express");
const router = express.Router();
const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Account creation
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



module.exports = router;