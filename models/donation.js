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
      required: true,
    },
    email: {
      type: String,
    },
    supportType: {
      type: String,
      enum: ["money", "material"],
      required: true,
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
      required: true,
      default: Date.now,
    },
  })
);

module.exports.newDonate = async function newDonate(payload) {
  let d = new Donation({
    name: payload.name,
    contact: payload.contact,
    email: payload.email,
    supportType: payload.supportType,
    accNumber: payload.accNumber,
    amount: payload.amount,
    material: payload.material,
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
module.exports.findById = async function findById(id) {
  return await Donation.find({ _id: id });
};
module.exports.findWithOptions = async function findById(payload) {
  let filter = {};
  filter.dateImported = {};

  if (payload.from) filter.dateImported.$gte = payload.from;
  if (payload.to) filter.dateImported.$lte = payload.to;
  if (payload.contact) filter.contact = payload.contact;

  return await Donation.find(filter);
};
