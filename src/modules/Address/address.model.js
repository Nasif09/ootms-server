const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    latitude: { type: String },
    longitude: { type: String },
    city: { type: String, require: [true, 'city is required'] },
    state: { type: String, require: [true, 'state is required'] },
    zip: { type: Number, require: [true, 'zip is required'] },
    po: { type: Number, require: [true, 'post office is required'] },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Address', addressSchema)