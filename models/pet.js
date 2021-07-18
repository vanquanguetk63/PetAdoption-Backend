// const { date, func } = require('joi');
const mongoose = require("mongoose");

/*
  TODO:
  - Use Joi validation
  - Add more attribute to Pet model
  - Add more exports method
*/

const Pet = new mongoose.model(
  "pet",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    species: {
      type: String,
      required: true,
      enum: ["dog", "cat"],
    },
    description: {
        type: String,
        maxlength: 255,
    },

  })
);

module.exports.newPet = async function newPet(name, species, ...arr) {
    let p =new Pet({
        name: name,
        species: species,
        description: arr[0],
    })
    try{
        await p.save();
        return p;
    }
    catch (ex) {
        console.log(ex.message);
    }
}

module.exports.findAll = async function findAll() {
    return await Pet.find()
}
module.exports.find10 = async function find10() {
    return await Pet.find()
      .limit(10)
}
module.exports.findById = async function findById(id) {
    return await Pet.find({ _id: id})
}

