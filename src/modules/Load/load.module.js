const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({

  userId: { type: mongoose.Types.ObjectId, ref: "User" },

  load : [{
    shipperAddress: {
      name: { type: String, trim: true },
      email: { type: String, require: [true, 'Email is required'], trim: true },
      phone: { type: Number, require: [true, 'Phone is required'] },
      city: { type: String, required: [true, 'city is required'] },
      state: { type: String, required: [true, 'state is required'] },
      zip: { type: Number, required: [true, 'zip is required'] },
      po: { type: Number, required: [true, 'post office is required'] },
      address: { type: String}
      // latitude: { type: String, require: true },
      // longitude: { type: String, require: true },
    },
    receiverAddress: {
      name: { type: String, trim: true },
      email: { type: String, require: [true, 'Email is required'], trim: true },
      phone: { type: Number, require: [true, 'Phone is required'] },
      city: { type: String, required: [true, 'city is required'] },
      state: { type: String, required: [true, 'state is required'] },
      zip: { type: Number, required: [true, 'zip is required'] },
      po: { type: Number, required: [true, 'post office is required'] },
      address: { type: String}
      // latitude: { type: String, require: true },
      // longitude: { type: String, require: true },
    },
    palletSpace: { type: Number },
    weight: { type: Number },
    billOfLoading: { type: Number },
    description: { type: String },
  
    pickUpDate: { type: Date },
    deliveryDate: { type: Date },
    loadType: { type: String, require: [true, 'Load Type is require'] },
    productType: {
      type: [String],
      enum: ['Hazmat', 'Dangerous', 'Flammable Gas 2', 'Poson 6', 'Corrosive', 'Oxygen2', 'Dangerous', 'Flamable 3', 'Radioactive', 'Non-Flammable']
    },
    status: { type: String, enum: ['pending', 'rejected', 'accept'], default: 'pending' },
    driverId: { type: mongoose.Types.ObjectId, ref: "User" }
  }]
  
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Load', loadSchema)