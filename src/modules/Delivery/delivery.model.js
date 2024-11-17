const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    PickUpDate: { type: Date, require : [true, 'PickUp date is required'] },
    deliveryDate: { type: Date, require : [true, 'Delivery date is required'] },
    status : { type : String, enum : ['pending','picked up', 'dispatched', 'in transit'], default: 'pending'},
    load : { type: mongoose.Types.ObjectId , ref: "User" },
  },
    {
      timestamps: true
    }
)

module.exports = mongoose.model('Load',addressSchema)