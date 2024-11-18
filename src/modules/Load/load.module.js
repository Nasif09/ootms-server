const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
  shipperAddress: {
    latitude: { type: String, require: true },
    longitude: { type: String, require: true },
  },
  receiverAddress: {
    latitude: { type: String, require: true },
    longitude: { type: String, require: true },
  },
  palletSpace: { type: Number },
  weight: { type: Number },
  billOfLoading: { type: Number },
  description: { type: String },

  pickUpDate : { type: Date},
  deliveryDate : { type: Date},
  loadType: { type: String, require: [true, 'Load Type is require'] },
  productType: {
    type: [String],
    enum: ['Hazmat', 'Dangerous', 'Flammable Gas 2', 'Poson 6', 'Corrosive', 'Oxygen2', 'Dangerous', 'Flamable 3', 'Radioactive', 'Non-Flammable']
  },
  status: { type: String, enum: ['pending', 'rejected', 'accept'], default: 'pending' },
  shipperId: { type: mongoose.Types.ObjectId, ref: "User" },
  receiverId: { type: mongoose.Types.ObjectId, ref: "User" },
  driverId: { type: mongoose.Types.ObjectId, ref: "User" },
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Load', loadSchema)