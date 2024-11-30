const PrivacyPolicy = require("./privacyPolicy.model");

const addPrivacyPolicy = async(content) => {
    const privacyPolicy = await findOnePrivacyPolicy();
    if(!privacyPolicy){
        var newPrivacyPolicy = new PrivacyPolicy({content});
        return await newPrivacyPolicy.save();
    }else{
        privacyPolicy.content = content;
        return await privacyPolicy.save();
    }
}

const findOnePrivacyPolicy = async() => {
    return await PrivacyPolicy.findOne();
}

const getPrivacyPolicy = async() => {
    return await PrivacyPolicy.findOne().select('-_id -__v');
}

module.exports = {
    addPrivacyPolicy,
    findOnePrivacyPolicy,
    getPrivacyPolicy
}