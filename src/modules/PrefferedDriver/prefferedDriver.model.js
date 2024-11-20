const mongoose = require('mongoose');

const prefferedDriverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  favourite : [{
    driverId : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  }]
});

module.exports = mongoose.model('PrefferedDriver', prefferedDriverSchema);