const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "myNameisEnthonygostabhaimeduniya23@#"
router.post("/createuser", [
  body("email").isEmail(),
  body("name").isLength({ min: 5 }),
  body("Password", "incorrect Password").isLength({ min: 5 })],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    const salt = await bcrypt.genSalt(10);
    let secPassword = await bcrypt.hash(req.body.Password, salt)

    try {
      await User.create({
        name: req.body.name,
        Password: secPassword, // Changed to match the lowercase 'password' in your request
        email: req.body.email,
        location: req.body.location,
      });

      res.json({ success: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

router.post("/loginuser", [
  body("email").isEmail(),
  body("Password", "incorrect Password").isLength({ min: 5 })],
  async (req, res) => {

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    let email = req.body.email;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "try with correct information" });
      }
      const pwdCompare = await bcrypt.compare(req.body.Password, userData.Password)
      if (!pwdCompare) {
        return res.status(400).json({ errors: "Enter Correct Password" });
      }
      const data = {
        user: {
          id: userData.id
        }
      }
      
      const authToken = jwt.sign(data, jwtSecret)
      return res.json({ success: true, authToken:authToken });

    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);


module.exports = router;
