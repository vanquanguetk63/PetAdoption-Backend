const express = require('express');
const petRouter = express.Router();
const petModel = require('../models/pet');

petRouter.route('/')
    .get(async function (req, res, next) {
        let list= await petModel.findAll();
        res.send(list?list:"no thong");
    })
    .post(async function (req, res, next) {
        let data=req.body;
        let petp = await petModel.newPet(data.name, data.species);
        res.send(petp);
    });
petRouter.route('/:id')
    .get(async function (req, res, next) {
        let p= await petModel.findById(req.params.id);
        res.send(p);
    })

module.exports = petRouter;