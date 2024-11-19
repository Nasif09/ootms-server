const mongoose = require('mongoose');

const prefferedDriverSchema = new mongoose.Schema({
  shipperId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driverId : { type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('PrefferedDriver', prefferedDriverSchema);