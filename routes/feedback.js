const express = require("express");
const fbRouter = express.Router();
const feedbackModel = require("../models/feedback");

fbRouter.route("/").get(async function (req, res, next) {
  res.send(await feedbackModel.findAll());
});
// .post(async function (req, res, next) {
//   let payload = req.body;
//   let result = await feedbackModel
//     .new
//     //   payload. ...,
//     ();
//   res.send(result);
// });

module.exports = fbRouter;
