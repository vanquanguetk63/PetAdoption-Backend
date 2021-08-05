const mongoose = require("mongoose");

// chưa fix
const Adoption = new mongoose.model(
  "adoption",
  new mongoose.Schema({
    adopterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "human",
    },
    petId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "pet",
    },
    dateImported: {
      type: Date,
      require: true,
      default: Date.now,
    },
  })
);

module.exports.newAdoption = async function newAdoption(adopterId, petId) {
  let d = new Adoption({
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
  return await Adoption.find();
};
