const mongoose = require('mongoose');

const userScema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, require: [true, 'Email is required'], trim: true },
  phone: { type: Number, require: [true, 'Phone is required'] },
  image: { type: String, required: false, default: '/uploads/users/user.png' },
  password: { type: String, required: true },
  city: { type: String, required: [true, 'city is required'] },
  state: { type: String, required: [true, 'state is required'] },
  zip: { type: Number, required: [true, 'zip is required'] },
  po: { type: Number, required: [true, 'post office is required'] },
  role: { type: String, enum: ['admin', 'shipper', 'receiver', 'driver'], default: 'shipper' },
  subscription: {
    subscriptionId: { type: mongoose.Types.ObjectId, ref: "Subscription" },
    startDate: { type: Date },
    expiryDate: { type: Date },
    isActive: { type: Boolean }
  },
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userScema)