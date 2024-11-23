const mongoose = require('mongoose');

const loadRequestSchema = new mongoose.Schema({
    loads: [{ type: mongoose.Types.ObjectId, ref: "Load" }],
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    requestedBy : { type: String}, //role fetched by userId
    status: { type: String, enum: ['pending', 'picked', 'in transit'], default: 'pending' },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('LoadRequest', loadRequestSchema)