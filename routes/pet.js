const express = require("express");
const petRouter = express.Router();
const petModel = require("../models/pet");

petRouter
  .route("/")
  .get(async (req, res) => {
    res.send(await petModel.findAll());
  })
  .post(async (req, res) => {
    res.send(await petModel.newPetv2(req.body));
  });

petRouter.route("/:petcode").get(async (req, res) => {
  res.send(await petModel.findByPetCode(req.params.petcode));
});

module.exports = petRouter;
