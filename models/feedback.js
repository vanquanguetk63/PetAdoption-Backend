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
    // isBrowsed: {
    //   type: Boolean,
    //   default: false,
    //   require: true,
    // },
    // dateBrowsed: {
    //   type: Date,
    // },
    dateImported: {
      type: Date,
      require: true,
      default: Date.now,
    },
  })
);

module.exports.newDonate = async function newDonate(
  name,
  email,
  title,
  content
) {
  let f = new Feedback({
    name: name,
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
