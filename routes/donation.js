const express = require("express");
const petRouter = express.Router();
const donModel = require("../models/donation");

petRouter.route("/").get(async function (req, res, next) {
  res.send(await donModel.findAll());
});
// .post(async function (req, res, next) {
//   let payload = req.body;
//   let result = await donModel.newPet(
//     payload.name,
//     payload.contact,
//     payload.email,
//     payload.supportType,
//     payload.accNumber,
//     payload.amount,
//     payload.material
//   );
//   res.send(result);
// });

module.exports = petRouter;
