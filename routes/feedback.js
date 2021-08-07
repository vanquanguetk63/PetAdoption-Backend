const express = require("express");
const fbRouter = express.Router();
const feedbackModel = require("../models/feedback");

fbRouter
  .route("/")
  .get(async function (req, res, next) {
    res.send(await feedbackModel.findAll());
  })
  .post(async function (req, res, next) {
    res.send(await feedbackModel.newFeedback(req.body));
  });
fbRouter.route("/find").post(async (req, res) => {
  res.send(await feedbackModel.findWithOptions(req.body));
});
fbRouter.route("/:id").post(async (req, res) => {
  res.send(await feedbackModel.findById(req.params.id));
});
module.exports = fbRouter;
