const mongoose = require("mongoose");

const Feedback = new mongoose.model(
  "feedback",
  new mongoose.Schema({
    name: {
      type: String,
      // required: true,
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

module.exports.newFeedback = async function newFeedback(payload) {
  let f = new Feedback({
    name: payload.name,
    email: payload.email,
    title: payload.title,
    content: payload.content,
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
module.exports.findAllNewest = async function findAll() {
  return await Feedback.find().sort({ dateImported: 1 });
};
module.exports.findById = async function findById(id) {
  return await Feedback.findOne({ _id: id });
};
module.exports.findWithOptions = async function findWithOptions(payload) {
  let filter = {};
  if (payload.id) filter.id = payload.id;
  if (payload.email) filter.email = payload.email;

  let pageNumber = payload.pageNumber || 1;
  let pageSize = payload.pageSize || 8;
  return await Feedback.find(filter)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ dateImported: 1 });
};
