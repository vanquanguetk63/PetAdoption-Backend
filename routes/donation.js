const express = require("express");
const petRouter = express.Router();
const donModel = require("../models/donation");

petRouter
  .route("/")
  .get(async (req, res) => {
    res.send(await donModel.findAll());
  })
  .post(async (req, res) => {
    res.send(await donModel.newDonate(req.body));
  });
petRouter.route("/:id").get(async (req, res) => {
  res.send(await donModel.findById(req.params.petCode));
});
petRouter.route("/find").post(async (req, res) => {
  res.send(await donModel.findWithOptions(req.body));
});
module.exports = petRouter;
