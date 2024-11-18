const mongoose = require('mongoose');

const settingSchema = new Schema({
    privacyPolicy: { type: String },
    aboutUs: { type: String },
    support: { type: String },
    termsOfService: { type: String }
});

module.exports = mongoose.model('Setting', settingSchema)
