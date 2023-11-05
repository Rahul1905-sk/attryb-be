const mongoose = require("mongoose");

const oemSchema = mongoose.Schema({
  brand: {type: String, required: true},
  model: {type: String, required: true},
  image: {type: String, required: true},
  year:  {type: Number, required: true},
  colors:  {type: [String], required: true},
  power_bhp:  {type: Number, required: true},
  price_inr:  {type: Number, required: true},
  mileage_city:  {type: Number, required: true},
  mileage_highway:  {type: Number, required: true},
  max_speed:  {type: Number, required: true}
}, {
    versionKey : false
})


const OemModel = mongoose.model('OEM_Spec',oemSchema)

module.exports = {
    OemModel
}