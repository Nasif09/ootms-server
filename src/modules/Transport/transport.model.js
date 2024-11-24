const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  driverId: { type: mongoose.Types.ObjectId, ref: "User" },
  truckNumber: { type: String, require: true },
  trailerSize: { type: String, require: true },
  palletSpace: { type: Number, require: true },
  availablity: { type: Boolean },

  cdlNumber: { type: String, require: [true, 'CDL Number is required'] },
  documents: { type: String },
})

module.exports = mongoose.model('Transport', transportSchema)