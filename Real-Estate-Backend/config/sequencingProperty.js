const mongoose = require("mongoose");

const SequenceSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    required: true,
  },
});

const PropertyCounter = mongoose.model("PropertyCounter", SequenceSchema);

const getSequenceNextValue = (seqName) => {
  return new Promise((resolve, reject) => {
    PropertyCounter.findByIdAndUpdate(
      { _id: seqName },
      { $inc: { seq: 1 } },
      (error, counter) => {
        if (error) {
          reject(error);
        }
        if (counter) {
          resolve(counter.seq + 1);
        } else {
          resolve(null);
        }
      }
    );
  });
};

const insertCounter = (seqName) => {
  const newCounter = new PropertyCounter({ _id: seqName, seq: 1000 });
  return new Promise((resolve, reject) => {
    newCounter
      .save()
      .then((data) => {
        resolve(data.seq);
      })
      .catch((err) => reject(err));
  });
};
module.exports = {
  PropertyCounter,
  getSequenceNextValue,
  insertCounter,
};
