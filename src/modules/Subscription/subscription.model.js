const mongoose = require('mongoose');

const subscriptionSchema = new Schema({
    planName: { type: String },
    description: { type: String },
    price: { type: String }
});

module.exports = mongoose.model('Subscription', subscriptionSchema)
