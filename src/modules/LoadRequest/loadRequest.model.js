const mongoose = require('mongoose');

const loadRequestSchema = new mongoose.Schema({
    shipperId: { type: mongoose.Types.ObjectId, ref: "User" },
    driverId: { type: mongoose.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ['pending', 'picked', 'in transit'], default: 'pending' },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('loadRequest', loadRequestSchema)