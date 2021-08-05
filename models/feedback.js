const mongoose = require("mongoose");

// chưa fix

const Feedback = new mongoose.model(
  "feedback",
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
      // require:true,
    },
    email: {
      type: String,
    },
    title: {
      type: String,
      require: true,
    },
    content: {
      type: String,
    },
    isBrowsed: {
      type: Boolean,
      default: false,
      require: true,
    },
    dateBrowsed: {
      type: Date,
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
  title,
  content
) {
  let f = new Feedback({
    name: name,
    contact: contact,
    email: email,
    title: title,
    content: content,
  });
  try {
    await f.save();
    return f;
  } catch (ex) {
    console.log(ex.message);
  }
};

module.exports.findAll = async function findAll() {
  return await Feedback.find();
};
