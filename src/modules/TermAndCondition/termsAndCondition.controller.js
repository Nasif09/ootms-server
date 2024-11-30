const response = require("../../helpers/response");
const { addTermsAndCondition, getTermsAndCondition } = require("./termsAndCondition.service");

const upgradeTermsAndCondition = async (req, res) => {
    try {
        const { role } = req.User;
        const { content } = req.body;
        if (role !== 'admin') {
            return res.status(400).json(response({ status: "error", statusCode: '400', type: "TermsAndCondition", message: 'unauthorized user!' }));
        } else {
            const termsAndCondition = await addTermsAndCondition(content);
            return res.status(201).json(response({ status: "success", statusCode: '201', type: "TermsAndCondition", message: ' TermsAndCondition added successfully', data: termsAndCondition }));
        }
    } catch (error) {
        return res.status(400).json(response({ status: "error", statusCode: '400', type: "TermsAndCondition", message: 'failed to upgrade Privacy & Policy', erros: error.message }));
    }
}

//get TermsAndCondition
const findTermsAndCondition = async (req, res) => {
    try {
        const termsAndCondition = await getTermsAndCondition();
        return res.status(201).json(response({ status: "success", statusCode: '201', type: "TermsAndCondition", message: 'TermsAndCondition fetched successfully!', data: termsAndCondition }));
    } catch (error) {
        return res.status(400).json(response({ status: "error", statusCode: '400', type: "TermsAndCondition", message: 'failed to upgrade Privacy & Policy', erros: error.message }));
    }
}

module.exports = {
    findTermsAndCondition,
    upgradeTermsAndCondition
};