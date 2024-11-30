const mongoose = require('mongoose');

const privacyPolicySchema = new mongoose.Schema({
  content: { type: String, requred: [true, 'Content Required']},
});

module.exports = mongoose.model('PrivacyPolicy', privacyPolicySchema);