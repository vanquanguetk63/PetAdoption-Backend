// const { date, func } = require('joi');
const mongoose = require("mongoose");

/*
  TODO:
  - Use Joi validation
  - function to add image to id
  - function to set attribute
  - a general query function

*/

const Pet = new mongoose.model(
  "pet",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      maxlength: 100,
    },
    animal: {
      type: String,
      required: true,
      enum: ["cat", "dog"],
    },
    breed: {
      type: String,
      maxLength: 100,
      default: null,
    },
    color: {
      type: String,
      maxLength: 100,
    },
    weight: {
      type: String,
      max: 50,
    },
    petCode: {
      type: String,
      required: true,
      length: 5,
    },
    ageInMonths: {
      type: Number,
      max: 120,
      default: null,
    },
    sex: {
      type: String,
      enum: ["male", "female", ""],
    },
    isNeutered: { type: Boolean, default: null },
    isDiseaseVac: { type: Boolean, default: null },
    isRabiesVac: { type: Boolean, default: null },
    isHumanFriendly: { type: Boolean, default: null },
    isCatFriendly: { type: Boolean, default: null },
    isDogFriendly: { type: Boolean, default: null },
    isSpecialDiet: { type: Boolean, default: null },
    isPeeProperly: { type: Boolean, default: null },
    avatar: String,
    images: [String],
    description: {
      type: String,
      maxlength: 255,
    },
    isAdopted: {
      type: Boolean,
      require: true,
      default: false,
    },
    dateImported: {
      type: Date,
      default: Date.now,
    },
  })
);

async function generatePetCode() {
  let digit;
  do {
    digit = (Math.floor(Math.random() * 90000) + 10000).toString();
  } while ((await Pet.exists({ petCode: digit })) == true);
  return digit;
}
// module.exports.newPet = async function newPet(
//   name,
//   animal,
//   breed,
//   color,
//   ageInMonths,
//   sex,
//   isNeutered,
//   isDiseaseVac,
//   isRabiesVac,
//   isHumanFriendly,
//   isCatFriendly,
//   isDogFriendly,
//   isSpecialDiet,
//   isPeeProperly,
//   images,
//   description
//   // ...arr
// ) {
//   let p = new Pet({
//     name: name,
//     animal: animal,
//     breed: breed,
//     color: color,
//     petCode: await generatePetCode(),
//     ageInMonths: ageInMonths,
//     sex: sex,
//     isNeutered: isNeutered,
//     isDiseaseVac: isDiseaseVac,
//     isRabiesVac: isRabiesVac,
//     isHumanFriendly: isHumanFriendly,
//     isCatFriendly: isCatFriendly,
//     isDogFriendly: isDogFriendly,
//     isSpecialDiet: isSpecialDiet,
//     isPeeProperly: isPeeProperly,
//     images: images,
//     description: description,
//     dateImported: new Date(),
//   });
//   try {
//     await p.save();
//     return p;
//   } catch (ex) {
//     console.log(ex.message);
//   }
// };
module.exports.newPetv2 = async function newPetv2(payload) {
  let p = new Pet({
    name: payload.name,
    animal: payload.animal,
    breed: payload.breed,
    color: payload.color,
    weight: payload.weight,
    petCode: await generatePetCode(),
    ageInMonths: payload.ageInMonths,
    sex: payload.sex,
    isNeutered: payload.isNeutered,
    isDiseaseVac: payload.isDiseaseVac,
    isRabiesVac: payload.isRabiesVac,
    isHumanFriendly: payload.isHumanFriendly,
    isCatFriendly: payload.isCatFriendly,
    isDogFriendly: payload.isDogFriendly,
    isSpecialDiet: payload.isSpecialDiet,
    isPeeProperly: payload.isPeeProperly,
    avatar: payload.avatar,
    images: payload.images,
    description: payload.description,
    dateImported: new Date(),
  });
  try {
    await p.save();
    return p;
  } catch (ex) {
    console.log(ex.message);
  }
};

module.exports.findAll = async function findAll() {
  return await Pet.find();
};
module.exports.find10 = async function find10() {
  return await Pet.find().limit(10);
};
// external calls only ???
module.exports.findByPetCode = async function findByPetCode(petCode) {
  return await Pet.findOne({ petCode: petCode });
};

module.exports.findWithOptions = async function findWithOptions(payload) {
  let filter = {};
  if (payload.animal) filter.animal = payload.animal;
  if (payload.sex) filter.sex = payload.sex;
  // if (payload.ageInMonths) filter.ageInMonths = payload.ageInMonths;
  if (payload.isNeutered) filter.isNeutered = payload.isNeutered;
  // if (payload.color) filter.color = payload.color;
  // if (payload.weight) filter.weight = payload.weight;
  if (payload.isPeeProperly) filter.isPeeProperly = payload.isPeeProperly;
  let pageNumber = payload.pageNumber || 1;
  let pageSize = payload.pageSize || 8;
  return await Pet.find(filter)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ dateImported: 1 });
};

module.exports.updateInfo = async function updateInfo(payload) {
  const p = await Pet.findOne({ petCode: payload.petCode });
  console.log(p);
  if (p) {
    p.set({
      name: payload.name,
      animal: payload.animal,
      breed: payload.breed,
      color: payload.color,
      weight: payload.weight,
      // ageInMonths: payload.ageInMonths,
      // sex: payload.sex,
      isNeutered: payload.isNeutered,
      isDiseaseVac: payload.isDiseaseVac,
      isRabiesVac: payload.isRabiesVac,
      isHumanFriendly: payload.isHumanFriendly,
      isCatFriendly: payload.isCatFriendly,
      isDogFriendly: payload.isDogFriendly,
      isSpecialDiet: payload.isSpecialDiet,
      isPeeProperly: payload.isPeeProperly,
      // images: payload.images,
      // description: payload.description,
      isAdopted: payload.isAdopted || false,
    });
    await p.save();
    return p;
  }
};
