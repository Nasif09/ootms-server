const mongoose = require('mongoose');

const mySubscriptionSchema = new Schema({
    subscriptionId: { type: mongoose.Types.ObjectId, ref: "Subscription" },
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    startDate: { type: Date },
    expiryDate: { type: Date },
});

module.exports = mongoose.model('MySubscription', mySubscriptionSchema)
