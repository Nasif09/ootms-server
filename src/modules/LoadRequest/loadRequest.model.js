const mongoose = require('mongoose');

const loadRequestSchema = new mongoose.Schema({
    loadId: { type: mongoose.Types.ObjectId, ref: "Load" },
    transportId: { type: String },
    status: { type: String, enum: ['pending', 'requested', 'picked', 'in transit'] },
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('LoadRequest', loadRequestSchema)