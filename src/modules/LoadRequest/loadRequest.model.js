const mongoose = require('mongoose');

const loadRequestSchema = new mongoose.Schema({
    loadId: { type: mongoose.Types.ObjectId, ref: "Load" },
    //userId: { type: mongoose.Types.ObjectId, ref: "User" },
    driverId: { type: mongoose.Types.ObjectId, ref: "User" },
    requestedBy : { type: String, enum: ['user','driver'], default: 'user' },
    truckNumber: { type: String },
    availablity: { type: String },
    status: { type: String, enum: ['pending', 'requested', 'rejected','accepted', 'picked', 'delivired'] },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('LoadRequest', loadRequestSchema)