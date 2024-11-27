const response = require("../../helpers/response");
const { addTransport, getTransport } = require("./transport.service");

const addtransport = async (req, res) => {
    try {
        var { truckNumber, trailerSize, palletSpace, cdlNumber } = req.body;
        var driverId = req.User.id;
        const transport = { truckNumber, trailerSize, palletSpace, cdlNumber, driverId };
        const truck = await addTransport(transport);
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'transport', message: " transport added Successfully", data: truck }));
    } catch (error) {
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'transport', message: "Failed to add transport", errors: error.message }));
    }
}

const findTransportInfo = async (req, res) => {
    try {
        var { transportId } = req.body;
        var filter = { _id : transportId }
        var find = 'truckNumber availablity palletSpace trailerSize trailerSize';
        var modelfields = "name email address phone";
        const transport = await getTransport(filter, find, modelfields, true);
        if (!transport) { 
            return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "you don't add any transport yet" }));
        }
        return res.status(201).json(response({ status: 'OK', statusCode: '201', type: 'driver', message: "transport fetched Successfull", data: transport }));

    } catch (error) {
        console.log(error);
        return res.status(400).json(response({ status: 'Fail', statusCode: '400', type: 'driver', message: "Failed to fetch Transport", errors: error.message }));
    }
}


module.exports = {
    addtransport,
    findTransportInfo
}; 