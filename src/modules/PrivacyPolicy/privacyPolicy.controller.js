const response = require("../../helpers/response");
const { addPrivacyPolicy, getPrivacyPolicy } = require("./privacyPolicy.service");

const upgradePrivacyPolicy = async (req, res) => {
    try {
        const { role } = req.User;
        const { content } = req.body;
        if (role !== 'admin') {
            return res.status(400).json(response({ status: "error", statusCode: '400', type: "PrivacyPolicy", message: 'unauthorized user!' }));
        } else {
            const privacyPolicy = await addPrivacyPolicy(content);
            return res.status(201).json(response({ status: "suyccess", statusCode: '201', type: "PrivacyPolicy", message: ' Privacy & Policy added successfully', data: privacyPolicy }));
        }
    } catch (error) {
        return res.status(400).json(response({ status: "error", statusCode: '400', type: "PrivacyPolicy", message: 'failed to upgrade Privacy & Policy', erros: error.message }));
    }
}

//get PrivacyPolicy
const findPrivacyPolicy = async (req, res) => {
    try {
        const privacyPolicy = await getPrivacyPolicy();
        return res.status(201).json(response({ status: "success", statusCode: '201', type: "PrivacyPolicy", message: 'privacyPolicy fetched successfully!', data: privacyPolicy }));
    } catch (error) {
        return res.status(400).json(response({ status: "error", statusCode: '400', type: "PrivacyPolicy", message: 'failed to upgrade Privacy & Policy', erros: error.message }));
    }
}

module.exports = {
    upgradePrivacyPolicy,
    findPrivacyPolicy
};