const mongoose = require('mongoose');

const userScema = new mongoose.Schema({
    name : { type: String, trim : true },
    email : { type : String, require : [true, 'email is required'], trim : true },
    image: { type: String, required: false, default: '/uploads/users/user.png' },
    password: { type: String, required: false },
    role: { type: String, enum: ['admin', 'shipper', 'receiver', 'driver'], default: 'user' },
    expiaryDate: { type: Date },
  },
    {
      timestamps: true
    }
)

module.exports = mongoose.model('User',userScema)