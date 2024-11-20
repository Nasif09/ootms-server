const response = require("../../helpers/response");
const { getTransport } = require("./loadRequest.service");
const { addDriver, getDriverById } = require("./prefferedDriver.service");



const findTransportInfo = async (req, res) => {
    try {
        var driverId = req.User.id;
        const transport = await getTransport(driverId);
        if(!transport){
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "you don't add any transport yet" }));
        }
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "transport fetched Successfull", data: transport }));

    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "Failed to fetch Transport", errors: error.message }));
    }
}

module.exports = { 
    
    findTransportInfo
};