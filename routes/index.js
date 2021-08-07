const express = require("express");
const router = express.Router();
const petRouter = require("./pet");
const donationController = require("./donation");
const feedbackController = require("./feedback");

router.use("/pet", petRouter);
router.use("/donation", donationController);
router.use("/feedback", feedbackController);
router.get("/", (req, res) => {
  // add docs here
  res.send("Pet Adoption!");
});

module.exports = router;
