const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  driverId: { type: mongoose.Types.ObjectId, ref: "User" },
  //driverId: { type: String, require: [true, 'driverId is required'] },
  trailerSize: { type: String, require: [true, 'trailerSize is required'] },
  palletSpace: { type: Number, require: [true, 'palletSpace is required'] },
  // availablity: { type: Boolean },
  truckNumber : {type: String,  require: [true, 'truckNumber is required']},
  cdlNumber: { type: String, require: [true, 'cdlNumber is required'] },
  documents: { type: String },
})

module.exports = mongoose.model('Transport', transportSchema)