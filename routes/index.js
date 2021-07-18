const express = require('express');
const router = express.Router();
const petRouter = require('./petController')

router.use('/pet', petRouter);

module.exports = router;