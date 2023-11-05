const mongoose = require("mongoose");

const dealerSchema = mongoose.Schema({
  kilometer: {type: Number, require: true},
  scratches: {type: String, require: true,},
  originalPaint: {type: Boolean, require: true},
  accidents: {type: Number, require: true},
  owners: {type: String, require: true},
  place: {type: String, require: true},
  year:  {type: Number, required: true},
  fuel: {type: String, require: true},
  image: {type: String, required: true},
  transmission: {type: String, required: true},
  price:  {type: Number, required: true},
  brand: {type: String, required: true},
  model: {type: String, required: true},
  colors:  {type: String, required: true},
  title:  {type: String, required: true},
  userID:  {type: String, required: true, ref:"user"},
  username:  {type: String, required: true},
  
}, {
    versionKey : false
})


const DealerModel = mongoose.model('Marketplace_Inventory',dealerSchema)

module.exports = {
    DealerModel
}