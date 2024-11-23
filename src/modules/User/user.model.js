const mongoose = require('mongoose');

const userScema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, required: [true, 'Email is required'], trim: true },
  phone: { type: Number },
  image: { type: String, required: false, default: '/uploads/users/user.png' },
  password: { type: String, required: true },
  taxid: { type: Number },
  address: { type: String },
  city: { type: String, required: [false, 'city is required'] },
  state: { type: String, required: [false, 'state is required'] },
  zip: { type: Number, required: [false, 'zip is required'] },
  po: { type: Number, required: [false, 'post office is required'] },
  role: { type: String, enum: ['admin', 'user', 'driver'], default: 'user' },
  transport: { type: mongoose.Types.ObjectId, ref:"Transport" }
},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userScema)  