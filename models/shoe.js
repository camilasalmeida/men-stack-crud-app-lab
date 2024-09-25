//Import our mongoose package
const mongoose = require('mongoose');

//Create the shoes Schema
const shoeSchema = new mongoose.Schema({
    name: String,
    hasYouBoughtYet: Boolean,
})

//Register/create the model
const Shoe = mongoose.model('Shoe', shoeSchema);

//Export the model
module.exports = Shoe;