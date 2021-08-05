const mongoose = require("mongoose");

// chưa fix
const Donation = new mongoose.model(
  "donation",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    //sdt
    contact: {
      type: String,
      length: 10,
      require: true,
    },
    email: {
      type: String,
    },
    supportType: {
      type: String,
      enum: ["money", "material"],
      require: true,
    },
    accNumber: {
      type: String,
      // required: true,
    },
    amount: {
      type: Number,
      min: 0,
    },
    material: {
      type: [String],
    },
    dateImported: {
      type: Date,
      require: true,
      default: Date.now,
    },
  })
);

module.exports.newDonate = async function newDonate(
  name,
  contact,
  email,
  supportType,
  accNumber,
  amount,
  material
) {
  let d = new Donation({
    name: name,
    contact: contact,
    email: email,
    supportType: supportType,
    accNumber: accNumber,
    amount: amount,
    material: material,
  });
  try {
    await d.save();
    return d;
  } catch (ex) {
    console.log(ex.message);
  }
};

module.exports.findAll = async function findAll() {
  return await Donation.find();
};
