const mongoose = require("mongoose");

// chưa fix
const Human = new mongoose.model(
  "human",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    contact: {
      type: String,
      length: 10,
      require: true,
    },
    email: {
      type: String,
    },
    dateImported: {
      type: Date,
      require: true,
      default: Date.now,
    },
  })
);

module.exports.newAdoption = async function newAdoption(adopterId, petId) {
  let d = new Human({
    adopterId: adopterId,
    petId: petId,
  });
  try {
    await d.save();
    return d;
  } catch (ex) {
    console.log(ex.message);
  }
};

module.exports.findAll = async function findAll() {
  return await Human.find();
};
