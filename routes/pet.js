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

petRouter
  .route("/:petCode")
  .get(async (req, res) => {
    res.send(await petModel.findByPetCode(req.params.petCode));
  })
  .put(async (req, res) => {
    // res.send(req.body);
    req.body.petCode = req.params.petCode;
    res.send(await petModel.updateInfo(req.body));
  });

petRouter.route("/find").post(async (req, res) => {
  res.send(await petModel.findWithOptions(req.body));
  // res.send(req.body);
});

module.exports = petRouter;
