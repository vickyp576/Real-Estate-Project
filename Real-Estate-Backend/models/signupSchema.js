const mongoose = require("mongoose");
const validator = require("validator");
const sequencing = require("../config/sequencing");

const signupSchema = new mongoose.Schema({
  _id: Number,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  cpassword: {
    type: String,
    required: true,
    min: 6,
  },
});

signupSchema.pre("save", function (next) {
  let doc = this;
  sequencing
    .getSequenceNextValue("user_id")
    .then((counter) => {
      console.log("asdasd", counter);
      if (!counter) {
        sequencing
          .insertCounter("user_id")
          .then((counter) => {
            doc._id = counter;
            console.log(doc);
            next();
          })
          .catch((error) => next(error));
      } else {
        doc._id = counter;
        next();
      }
    })
    .catch((error) => next(error));
});

const signupModal = mongoose.model("signup", signupSchema);

module.exports = signupModal;