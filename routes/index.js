const express = require("express");
const router = express.Router();
const petRouter = require("./pet");
const donationController = require("./donation");
const feedbackController = require("./feedback");
const path = require("path");
const guide = require("./guide.json");

router.use("/pet", petRouter);
router.use("/donation", donationController);
router.use("/feedback", feedbackController);
// router.use("/volunteer", );
router.get("/", (req, res) => {
  res.send(guide);
});

module.exports = router;
