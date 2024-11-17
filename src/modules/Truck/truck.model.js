const mongoose = require('mongoose');

const loadSchema = new mongoose.Schema({
    cdlNumber: { type: String, require : [true, 'CDL Number is required'] },
    documents: { type: String },
  },
    {
      timestamps: true
    }
)

module.exports = mongoose.model('Load',loadSchema)