const express = require('express');
const petRouter = express.Router();
const petModel = require('../models/pet');

petRouter.route('/')
    .get(async function (req, res, next) {
        // return a list
        let result= await petModel.findAll();
        res.send(result);
    })
    .post(async function (req, res, next) {
        let data=req.body;
        let result = await petModel.newPet(data.name, data.species, data.description);
        res.send(result);
    });
petRouter.route('/:id')
    .get(async function (req, res, next) {
        let result= await petModel.findById(req.params.id);
        res.send(result);
    })

module.exports = petRouter;