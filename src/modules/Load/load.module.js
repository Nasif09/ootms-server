const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
    loadType: { type: String, require : [true, 'Load Type is required'] },
    productType: { type: [String], 
        enum: ['Hazmat','Dangerous','Flammable Gas 2','Poson 6','Corrosive','Oxygen2','Dangerous','Flamable 3','Radioactive','Non-Flammable']},
    palletSpace: { type: Number },
    weight: { type: Number },
    billOfLoading: { type: Number },
    description: { type: String },
    status : { type : String, enum : ['pending','rejected', 'accept'], default: 'pending'},
    address : { type: mongoose.Types.ObjectId , ref: "Address" },
    shipperId : { type: mongoose.Types.ObjectId , ref: "User" },
    receiverId : { type: mongoose.Types.ObjectId , ref: "User" },
    driverId : { type: mongoose.Types.ObjectId , ref: "User" },
  },
    {
      timestamps: true
    }
)

module.exports = mongoose.model('Load',loadSchema)