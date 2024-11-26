const response = require("../../helpers/response");

const shippingHistory = async (req, res) => {
    try {
        var id = req.User.id;
        await getLoad(id);
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'shipping' }));
    } catch (error) {
        console.log(error)
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'shipping', message: "shipping history Failed to fetched", errors: error.message }));
    }
}
module.exports = {
    shippingHistory
}