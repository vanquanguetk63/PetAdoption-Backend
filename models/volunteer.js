const mongoose = require("mongoose");

// chưa fix
const Volunteer = new mongoose.model(
  "volunteer",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    contact: {
      type: String,
      length: 10,
    },
    email: {
      type: String,
    },
    dateImported: {
      type: Date,
      required: true,
      default: Date.now,
    },
  })
);

module.exports.newVolunteer = async function newVolunteer(payload) {
  let d = new Volunteer({
    name: payload.name,
    contact: payload.contact,
    email: payload.email,
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
