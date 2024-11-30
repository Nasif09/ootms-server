const TermsAndCondition = require("./termsAndCondition.model");


const addTermsAndCondition = async(content) => {
    const termsAndCondition = await findOneTermsAndCondition();
    if(!termsAndCondition){
        var newtermsAndCondition = new TermsAndCondition({content});
        return await newtermsAndCondition.save();
    }else{
        termsAndCondition.content = content;
        return await termsAndCondition.save();
    }
}

const findOneTermsAndCondition = async() => {
    return await TermsAndCondition.findOne();
}

const getTermsAndCondition = async() => {
    return await TermsAndCondition.findOne().select('-_id -__v');
}

module.exports = {
    addTermsAndCondition,
    findOneTermsAndCondition,
    getTermsAndCondition
}