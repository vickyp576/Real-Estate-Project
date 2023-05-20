const express = require("express");
const signupModal = require("../models/signupSchema");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config()
const SC_KEY=process.env.SC_KEY;

router.post("/login", (req, res) => {
  signupModal
    .find({ email: req.body.email })
    .then((data) => {
      if (!data.length) {
        res.status(400).send("User doesn't exists!");
        console.log(data.length);
      } else {
        bcrypt
          .compare(req.body.password, data[0].password)
          .then(function (result) {
            if (result) {
              const authToken = jwt.sign(data[0].email,SC_KEY);
              res.status(200).send({ authToken });
            } else {
              res.status(400).send("Incorrect password");
            }
          });
        console.log(data.length);
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/signup", (req, res) => {
  signupModal.find({ email: req.body.email }).then((data) => {
    if (data.length) {
      res.status(400).send("User already exists!");
    } else {
      const newUser = new signupModal({ ...req.body });
      bcrypt
        .hash(req.body.password, saltRounds)
        .then(function (hash) {
          // Store hash in your password DB.
          newUser.password = hash;
          newUser.cpassword = hash;
          newUser
            .save()
            .then((data) => {
              res.status(200).send(data);
            })
            .catch((err) => {
              res.status(403).send(err);
            });
        })
        .catch((err) => {
          res.status(404).send(err);
        });
    }
  });
});

module.exports = router;
