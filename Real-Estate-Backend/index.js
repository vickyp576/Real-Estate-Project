const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userController = require("./routes/userRoute");
const signupLoginController = require("./routes/signupLoginRoute");
const port = 3500;
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const DB = "mongodb+srv://vickypaswan576:Mainproject@cluster0.4rwbj6m.mongodb.net/?retryWrites=true&w=majority"; //"mongodb+srv://vickypaswan576:Mainproject@cluster0.ueli41x.mongodb.net/";

mongoose.connect(
  DB,
  () => {
    console.log("Successfully connected to database!");
  },
  (err) => {
    console.log(err);
  }
);

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening to server at port 3500");
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Realestate Backend server ");
});

app.use(userController);
app.use(signupLoginController);
