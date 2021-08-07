const express = require("express");
const router = express.Router();
const petRouter = require("./pet");
const donationController = require("./donation");
const feedbackController = require("./feedback");
const path = require("path");

router.use("/pet", petRouter);
router.use("/donation", donationController);
router.use("/feedback", feedbackController);
router.get("/", (req, res) => {
  // add docs here
  res.sendFile(path.join(__dirname, "/scheme.txt"));
});

module.exports = router;
