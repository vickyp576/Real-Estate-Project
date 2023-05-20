const express = require("express");
const userModal = require("../models/userSchema");
const router = express.Router();
const jwt = require("jsonwebtoken");
const signupModal = require("../models/signupSchema");
require("dotenv").config()
const SC_KEY=process.env.SC_KEY;

router.post("/addproperty", async (req, res) => {
  try {
    const users = new userModal(req.body);
    const createUser = await users.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send("Error in catch");
    console.log(e);
  }
});

router.get("/property", async (req, res) => {
  // res.status(200).send("property GET route")
  console.log(`This is cookie from backend ${req.headers.authorization}`);

  // console.log("get route of property")
  try {
    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, SC_KEY);
    console.log(verifyToken);
    if (verifyToken) {
      console.log(verifyToken);
      const userDetail = await signupModal.find({ email: verifyToken });
      //   console.log(userDetail);

      if (userDetail.length) {
        const propertyData = await userModal.find();
        res.status(200).send({ property: propertyData, userData: userDetail });
        console.log(userDetail);
      } else {
        res.status(409).send("Unauthorized user");
      }
      console.log(userDetail);
    } else {
      res.status(409).send("Unauthorized user");
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
    console.log(err);
  }
});

module.exports = router;
