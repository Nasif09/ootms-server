const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema({
    title : { type: String },
    description : { type: String },
  },
    {
      timestamps: true
    }
)

module.exports = mongoose.model('Support',supportSchema)