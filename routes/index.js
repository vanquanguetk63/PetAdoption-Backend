const express = require("express");
const router = express.Router();
const petRouter = require("./pet");
const donationController = require("./donation");
const feedbackController = require("./feedback");

router.use("/pet", petRouter);
router.use("/donation", donationController);
router.use("/feedback", feedbackController);

module.exports = router;
